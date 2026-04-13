-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forms table
CREATE TABLE IF NOT EXISTS forms (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'contact',
  data JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'unread'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_forms_type ON forms(type);
CREATE INDEX IF NOT EXISTS idx_forms_status ON forms(status);
CREATE INDEX IF NOT EXISTS idx_forms_submitted_at ON forms(submitted_at);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

-- Create policies for users table (allow all operations for authenticated users)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true);

-- Create policies for forms table (allow all operations for authenticated users)
CREATE POLICY "Allow all operations on forms" ON forms FOR ALL USING (true);

-- Insert default admin user if not exists
INSERT INTO users (id, username, password, role, created_at)
VALUES ('1', 'admin', '$2a$10$yDVrFPgTBz4fVhuzOJuBSed76h006i2q/EIWNCgTzrdpvW7gp3Q16', 'admin', NOW())
ON CONFLICT (id) DO NOTHING;