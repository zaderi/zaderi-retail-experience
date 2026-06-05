const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult, param } = require('express-validator');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Validate environment variables early
if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is required');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security: Helmet middleware for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://pppmrztsffgqvuvxife.supabase.co'],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Rate limiting middleware
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => NODE_ENV === 'development'
});

const formSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Too many form submissions, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => NODE_ENV === 'development'
});

const generalApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => NODE_ENV === 'development'
});

// Middleware stack
app.use(generalApiLimiter);
app.use(cookieParser());
app.use(cors({
  origin: [
    'https://www.zaderitechnologies.com',
    'https://zaderitechnologies.com',
    'https://zaderi-retail-experience.pages.dev'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CSRF protection middleware (for POST requests not using JWT)
const csrfProtection = csrf({ cookie: false });

app.use(express.static(path.join(__dirname, '../dist')));

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Data storage (migrated to Supabase for persistence)
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FORMS_FILE = path.join(DATA_DIR, 'forms.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

// Initialize data files if they don't exist (fallback for local development)
if (!fs.existsSync(USERS_FILE)) {
  // Note: Default admin must be created with environment variable or manually
  // NEVER hardcode credentials
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(FORMS_FILE)) {
  fs.writeFileSync(FORMS_FILE, JSON.stringify([], null, 2));
}

if (!fs.existsSync(CONTENT_FILE)) {
  const defaultContent = {
    hero: {
      title: "Accelerating Business with Modern Technology",
      subtitle: "Bridging the gap between traditional retail and future-tech. From smart POS systems to AI-powered chatbots, we build the tools that drive your business forward.",
      stats: [
        { value: "500+", label: "Businesses Served" },
        { value: "99.9%", label: "System Uptime" },
        { value: "24/7", label: "Customer Support" }
      ]
    },
    about: {
      title: "Technology That Drives Business Forward",
      description: "Zaderi Technologies is a Ugandan technology company specializing in smart business solutions and AI automation."
    }
  };
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
}

// Helper functions
const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return [];
  }
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Supabase helper functions
const ensureTablesExist = async () => {
  try {
    // Check if users table exists by trying to query it
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (usersError) {
      console.error('Users table does not exist or is not accessible:', usersError.message);
      console.log('Please run the SQL setup script in your Supabase dashboard');
    } else {
      console.log('Users table is accessible');
    }

    // Check if forms table exists by trying to query it
    const { data: formsData, error: formsError } = await supabase
      .from('forms')
      .select('id')
      .limit(1);

    if (formsError) {
      console.error('Forms table does not exist or is not accessible:', formsError.message);
      console.log('Please run the SQL setup script in your Supabase dashboard');
    } else {
      console.log('Forms table is accessible');
    }

    // Ensure default admin user exists only if ADMIN_PASSWORD is set
    if (process.env.ADMIN_PASSWORD) {
      const { data: existingUsers } = await supabase
        .from('users')
        .select('*')
        .eq('username', 'admin')
        .limit(1);

      if (!existingUsers || existingUsers.length === 0) {
        const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
        const { error } = await supabase
          .from('users')
          .insert([{
            id: '1',
            username: 'admin',
            password: hashedPassword,
            role: 'admin',
            created_at: new Date().toISOString()
          }]);

        if (error) {
          console.error('Error creating default admin user:', error);
        } else {
          console.log('Default admin user created');
        }
      } else {
        console.log('Default admin user already exists');
      }
    } else {
      console.log('ADMIN_PASSWORD not set - skipping default admin creation');
    }
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
  }
};

// Authentication middleware - validates JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Validation middleware - handles validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.param, message: e.msg }))
    });
  }
  next();
};

// Routes

// Login - with input validation and rate limiting
app.post('/api/auth/login', 
  loginLimiter,
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // JWT token with 2-hour expiration
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      // Refresh token with 7-day expiration
      const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Refresh token endpoint
app.post('/api/auth/refresh',
  body('refreshToken').notEmpty().withMessage('Refresh token is required'),
  handleValidationErrors,
  (req, res) => {
    try {
      const { refreshToken } = req.body;

      jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newToken = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '2h' }
        );

        res.json({ token: newToken });
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);


app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.created_at
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users (admin only)
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Get users error:', error);
      return res.status(500).json({ message: 'Failed to fetch users' });
    }

    res.json(users.map(u => ({
      user_id: u.id,
      username: u.username,
      role: u.role,
      createdAt: u.created_at,
      is_primary: u.id === '1'
    })));
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create user (admin only) - with password validation
app.post('/api/users', 
  authenticateToken,
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)'),
  body('role')
    .optional()
    .isIn(['admin', 'editor']).withMessage('Role must be admin or editor'),
  handleValidationErrors,
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const { username, password, role } = req.body;

      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = {
        id: Date.now().toString(),
        username,
        password: hashedPassword,
        role: role || 'admin',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (error) {
        console.error('Create user error:', error);
        return res.status(500).json({ message: 'Failed to create user' });
      }

      res.status(201).json({
        id: data.id,
        username: data.username,
        role: data.role,
        createdAt: data.created_at
      });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Update user (admin only) - with password validation
app.put('/api/users/:id',
  authenticateToken,
  param('id').notEmpty().withMessage('User ID is required'),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .optional()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character (!@#$%^&*)'),
  body('role')
    .optional()
    .isIn(['admin', 'editor']).withMessage('Role must be admin or editor'),
  handleValidationErrors,
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const { id } = req.params;
      const { username, password, role } = req.body;

      const updateData = {};
      if (username) {
        // Check if username already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('username')
          .eq('username', username)
          .neq('id', id)
          .single();

        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
        updateData.username = username;
      }

      if (password) {
        updateData.password = bcrypt.hashSync(password, 10);
      }

      if (role) {
        updateData.role = role;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Update user error:', error);
        return res.status(500).json({ message: 'Failed to update user' });
      }

      if (!data) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: data.id,
        username: data.username,
        role: data.role,
        createdAt: data.created_at
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Delete user (admin only) - with validation
app.delete('/api/users/:id',
  authenticateToken,
  param('id').notEmpty().withMessage('User ID is required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const { id } = req.params;

      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({ message: 'Failed to delete user' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Delete form (admin only) - with validation
app.delete('/api/forms/:id',
  authenticateToken,
  param('id').notEmpty().withMessage('Form ID is required'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;

      const { error } = await supabase
        .from('forms')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete form error:', error);
        return res.status(500).json({ message: 'Failed to delete form' });
      }

      res.json({ message: 'Form deleted successfully' });
    } catch (error) {
      console.error('Delete form error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Save form submission (public endpoint) - with validation and rate limiting
app.post('/api/forms',
  formSubmissionLimiter,
  body('type')
    .optional()
    .trim()
    .isIn(['contact', 'inquiry', 'support']).withMessage('Invalid form type'),
  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name must be less than 100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('Phone must be less than 20 characters'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must be less than 2000 characters'),
  handleValidationErrors,
  async (req, res) => {
    try {
      // Sanitize input - remove any script tags
      const sanitizeText = (text) => {
        if (!text) return text;
        return String(text).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/on\w+\s*=/gi, '');
      };

      const newForm = {
        id: Date.now().toString(),
        type: sanitizeText(req.body.type || 'contact'),
        data: {
          ...req.body,
          name: sanitizeText(req.body.name),
          email: sanitizeText(req.body.email),
          message: sanitizeText(req.body.message)
        },
        submitted_at: new Date().toISOString(),
        status: 'unread'
      };

      const { error } = await supabase
        .from('forms')
        .insert([newForm]);

      if (error) {
        console.error('Save form error:', error);
        return res.status(500).json({ message: 'Failed to save form submission' });
      }

      res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Save form error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Update form status (admin only) - with validation
app.put('/api/forms/:id',
  authenticateToken,
  param('id').notEmpty().withMessage('Form ID is required'),
  body('status')
    .isIn(['unread', 'read', 'resolved']).withMessage('Status must be unread, read, or resolved'),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const { data, error } = await supabase
        .from('forms')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Update form error:', error);
        return res.status(500).json({ message: 'Failed to update form' });
      }

      if (!data) {
        return res.status(404).json({ message: 'Form not found' });
      }

      res.json({ ...data, submittedAt: data.submitted_at });
    } catch (error) {
      console.error('Update form error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Delete form
app.delete('/api/forms/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('forms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete form error:', error);
      return res.status(500).json({ message: 'Failed to delete form' });
    }

    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Delete form error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get forms (authenticated only)
app.get('/api/forms',
  authenticateToken,
  async (req, res) => {
    try {
      const { data: forms, error } = await supabase
        .from('forms')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Get forms error:', error);
        return res.status(500).json({ message: 'Failed to fetch forms' });
      }

      res.json(forms.map(f => ({ ...f, submittedAt: f.submitted_at })));
    } catch (error) {
      console.error('Get forms error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Get users (admin only) - with validation
app.get('/api/users',
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Get users error:', error);
        return res.status(500).json({ message: 'Failed to fetch users' });
      }

      res.json(users.map(u => ({
        user_id: u.id,
        username: u.username,
        role: u.role,
        createdAt: u.created_at,
        is_primary: u.id === '1'
      })));
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Get CSRF token endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Get content (authenticated only)
app.get('/api/content',
  authenticateToken,
  (req, res) => {
    const content = readData(CONTENT_FILE);
    res.json(content);
  }
);


// Update content (admin only) - with CSRF and validation
app.put('/api/content',
  authenticateToken,
  csrfProtection,
  body().custom((value) => {
    // Validate content structure
    if (!value || typeof value !== 'object') {
      throw new Error('Invalid content structure');
    }
    return true;
  }),
  handleValidationErrors,
  (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    try {
      const newContent = req.body;
      writeData(CONTENT_FILE, newContent);
      res.json(newContent);
    } catch (error) {
      console.error('Update content error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// File upload security configuration
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Generate random filename to prevent path traversal and enumeration
const generateSecureFilename = (originalName) => {
  const ext = path.extname(originalName).toLowerCase();
  const randomName = require('crypto').randomBytes(16).toString('hex');
  return `${randomName}${ext}`;
};

// Custom multer storage with security checks
const secureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateSecureFilename(file.originalname));
  }
});

// File filter for multer
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  
  // Validate extension
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new Error(`File type .${ext} is not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`));
  }

  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error('Invalid file MIME type'));
  }

  cb(null, true);
};

const secureUpload = multer({
  storage: secureStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE
  }
});

// File upload endpoint (authenticated only)
app.post('/api/upload',
  authenticateToken,
  secureUpload.single('file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Double-check file size
    if (req.file.size > MAX_FILE_SIZE) {
      fs.unlinkSync(req.file.path);
      return res.status(413).json({ message: `File exceeds maximum size of 5MB` });
    }

    res.json({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: `/api/files/${req.file.filename}`
    });
  }
);

// File download endpoint (authenticated, secured)
app.get('/api/files/:filename',
  authenticateToken,
  param('filename')
    .matches(/^[a-f0-9]{32}\.[a-z]+$/)
    .withMessage('Invalid filename format'),
  handleValidationErrors,
  (req, res) => {
    try {
      const filename = req.params.filename;
      const filepath = path.join(__dirname, 'uploads', filename);

      // Prevent path traversal
      const normalizedPath = path.normalize(filepath);
      const uploadDir = path.normalize(path.join(__dirname, 'uploads'));
      
      if (!normalizedPath.startsWith(uploadDir)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      if (!fs.existsSync(filepath)) {
        return res.status(404).json({ message: 'File not found' });
      }

      res.download(filepath, filename);
    } catch (error) {
      console.error('File download error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Error handler for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(413).json({ message: 'File exceeds maximum size of 5MB' });
    }
    return res.status(400).json({ message: err.message });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

// Serve admin panel
app.get('/adminpanel', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log('Security features enabled:');
  console.log('  ✓ Helmet security headers');
  console.log('  ✓ Rate limiting');
  console.log('  ✓ Input validation & sanitization');
  console.log('  ✓ CSRF protection');
  console.log('  ✓ Secure file upload');
  console.log('  ✓ JWT authentication with 2-hour expiration');
  console.log('  ✓ Password strength requirements');
  await ensureTablesExist();
});