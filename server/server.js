const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
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
  const defaultUsers = [{
    id: '1',
    username: 'admin',
    password: bcrypt.hashSync('hOst@2026', 10),
    role: 'admin',
    createdAt: new Date().toISOString()
  }];
  fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2));
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
    // Create users table if it doesn't exist
    const { error: usersError } = await supabase.rpc('create_users_table_if_not_exists');
    if (usersError && !usersError.message.includes('already exists')) {
      console.log('Users table creation attempted (may already exist):', usersError.message);
    }

    // Create forms table if it doesn't exist
    const { error: formsError } = await supabase.rpc('create_forms_table_if_not_exists');
    if (formsError && !formsError.message.includes('already exists')) {
      console.log('Forms table creation attempted (may already exist):', formsError.message);
    }

    // Ensure default admin user exists
    const { data: existingUsers } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (!existingUsers || existingUsers.length === 0) {
      const hashedPassword = bcrypt.hashSync('hOst@2026', 10);
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
    }
  } catch (error) {
    console.error('Error ensuring tables exist:', error);
  }
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'zaderi-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login
app.post('/api/auth/login', async (req, res) => {
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

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'zaderi-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
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
});

// Get current user
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

// Create user (admin only)
app.post('/api/users', authenticateToken, async (req, res) => {
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
});

// Update user (admin only)
app.put('/api/users/:id', authenticateToken, async (req, res) => {
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
});

// Delete user (admin only)
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
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
});

// Get forms
app.get('/api/forms', authenticateToken, async (req, res) => {
  try {
    const { data: forms, error } = await supabase
      .from('forms')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Get forms error:', error);
      return res.status(500).json({ message: 'Failed to fetch forms' });
    }

    res.json(forms);
  } catch (error) {
    console.error('Get forms error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Save form submission (public endpoint for frontend)
app.post('/api/forms', async (req, res) => {
  try {
    const newForm = {
      id: Date.now().toString(),
      type: req.body.type || 'contact',
      data: req.body,
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
});

// Update form status
app.put('/api/forms/:id', authenticateToken, async (req, res) => {
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

    res.json(data);
  } catch (error) {
    console.error('Update form error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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

// Get content
app.get('/api/content', authenticateToken, (req, res) => {
  const content = readData(CONTENT_FILE);
  res.json(content);
});

// Update content
app.put('/api/content', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const newContent = req.body;
    writeData(CONTENT_FILE, newContent);
    res.json(newContent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// File upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

// Serve admin panel
app.get('/adminpanel', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Catch all handler: send back React's index.html file for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await ensureTablesExist();
});