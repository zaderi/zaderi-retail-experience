const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Data storage (in production, use a proper database)
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const USERS_FILE = path.join(DATA_DIR, 'users.json');
const FORMS_FILE = path.join(DATA_DIR, 'forms.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

// Initialize data files if they don't exist
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
    const users = readData(USERS_FILE);
    const user = users.find(u => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
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
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const users = readData(USERS_FILE);
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt
  });
});

// Get all users (admin only)
app.get('/api/users', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const users = readData(USERS_FILE);
  res.json(users.map(u => ({
    id: u.id,
    username: u.username,
    role: u.role,
    createdAt: u.createdAt
  })));
});

// Create user (admin only)
app.post('/api/users', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const { username, password, role } = req.body;
    const users = readData(USERS_FILE);

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      password: bcrypt.hashSync(password, 10),
      role: role || 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeData(USERS_FILE, users);

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (admin only)
app.put('/api/users/:id', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    const { id } = req.params;
    const { username, password, role } = req.body;
    const users = readData(USERS_FILE);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username && username !== users[userIndex].username) {
      if (users.find(u => u.username === username && u.id !== id)) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      users[userIndex].username = username;
    }

    if (password) {
      users[userIndex].password = bcrypt.hashSync(password, 10);
    }

    if (role) {
      users[userIndex].role = role;
    }

    writeData(USERS_FILE, users);
    res.json({
      id: users[userIndex].id,
      username: users[userIndex].username,
      role: users[userIndex].role,
      createdAt: users[userIndex].createdAt
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
app.delete('/api/users/:id', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const { id } = req.params;
  const users = readData(USERS_FILE);
  const filteredUsers = users.filter(u => u.id !== id);

  if (filteredUsers.length === users.length) {
    return res.status(404).json({ message: 'User not found' });
  }

  writeData(USERS_FILE, filteredUsers);
  res.json({ message: 'User deleted successfully' });
});

// Get forms
app.get('/api/forms', authenticateToken, (req, res) => {
  const forms = readData(FORMS_FILE);
  res.json(forms);
});

// Save form submission (public endpoint for frontend)
app.post('/api/forms', (req, res) => {
  try {
    const forms = readData(FORMS_FILE);
    const newForm = {
      id: Date.now().toString(),
      type: req.body.type || 'contact',
      data: req.body,
      submittedAt: new Date().toISOString(),
      status: 'unread'
    };

    forms.push(newForm);
    writeData(FORMS_FILE, forms);

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update form status
app.put('/api/forms/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const forms = readData(FORMS_FILE);
  const formIndex = forms.findIndex(f => f.id === id);

  if (formIndex === -1) {
    return res.status(404).json({ message: 'Form not found' });
  }

  forms[formIndex].status = status;
  writeData(FORMS_FILE, forms);
  res.json(forms[formIndex]);
});

// Delete form
app.delete('/api/forms/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const forms = readData(FORMS_FILE);
  const filteredForms = forms.filter(f => f.id !== id);

  if (filteredForms.length === forms.length) {
    return res.status(404).json({ message: 'Form not found' });
  }

  writeData(FORMS_FILE, filteredForms);
  res.json({ message: 'Form deleted successfully' });
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});