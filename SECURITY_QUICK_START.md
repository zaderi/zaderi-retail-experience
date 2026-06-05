# Security Quick Start Guide

## 🚀 Getting Started with Hardened Server

### 1. Setup Environment Variables

Create `.env` file in `server/` directory:

```bash
# Copy from template
cp server/.env.example server/.env
```

**Edit `server/.env`:**
```env
PORT=3001
JWT_SECRET=your-secure-random-secret-here-at-least-32-characters
NODE_ENV=development
ADMIN_PASSWORD=
SUPABASE_URL=https://pppmrztsffgqvuvxife.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Generate Strong JWT Secret

```bash
# Option 1: Using OpenSSL (Linux/Mac)
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Using online generator
# https://www.uuidgenerator.net/
```

Copy the output and paste into `JWT_SECRET` in your `.env` file.

### 3. Install Dependencies

```bash
cd server
npm install
```

All security packages are already in package.json:
- express-rate-limit
- express-validator
- helmet
- csurf
- cookie-parser

### 4. Start Server

```bash
npm start
```

You should see:
```
Server running on port 3001
Environment: development
Security features enabled:
  ✓ Helmet security headers
  ✓ Rate limiting
  ✓ Input validation & sanitization
  ✓ CSRF protection
  ✓ Secure file upload
  ✓ JWT authentication with 2-hour expiration
  ✓ Password strength requirements
```

---

## 🔑 Authentication Flow

### Login

**Request:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "admin",
    "role": "admin"
  }
}
```

### Store Tokens

**Client-side recommendations:**
```javascript
// Access token: Keep in memory or sessionStorage (expires in 2 hours)
sessionStorage.setItem('token', response.token);

// Refresh token: Keep in httpOnly cookie (expires in 7 days)
// Set via Set-Cookie header on server response
// Or store securely on client
```

### Use Token in API Calls

**Example with fetch:**
```javascript
const token = sessionStorage.getItem('token');

fetch('/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(user => console.log(user))
.catch(error => {
  if (error.status === 403) {
    // Token expired - use refreshToken to get new token
    refreshAccessToken();
  }
});
```

### Refresh Token When Expired

**Request:**
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👤 User Management

### Create User (Admin Only)

**Requirements:**
- Must be authenticated
- User must have admin role

**Password requirements:**
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

**Request:**
```bash
POST /api/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "username": "editor1",
  "password": "MySecurePass123!",
  "role": "editor"
}
```

**Response:**
```json
{
  "id": "1234567890",
  "username": "editor1",
  "role": "editor",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 📝 Form Submission

### Public Form (No Auth Required)

**Rate limit:** 10 submissions per hour per IP

**Request:**
```bash
POST /api/forms
Content-Type: application/json

{
  "type": "contact",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I am interested in your services"
}
```

**Validation:**
- ✓ Email must be valid format
- ✓ Name max 100 characters
- ✓ Phone max 20 characters
- ✓ Message max 2000 characters
- ✓ Type must be: contact, inquiry, or support
- ✓ Script tags automatically removed
- ✓ Event handlers stripped

**Response:**
```json
{
  "message": "Form submitted successfully"
}
```

---

## 📤 File Upload

### Upload File

**Requirements:**
- Must be authenticated
- File size max 5MB
- Allowed types: PDF, DOC, DOCX, JPG, PNG

**Request:**
```bash
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

FormData: {
  file: <binary file data>
}
```

**Response:**
```json
{
  "filename": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.pdf",
  "originalName": "document.pdf",
  "size": 102400,
  "path": "/api/files/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.pdf"
}
```

### Download File

**Request:**
```bash
GET /api/files/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6.pdf
Authorization: Bearer {token}
```

**Response:** Binary file download

---

## ⚠️ Rate Limiting

### Rate Limits in Effect

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/auth/login` | 5 attempts | 15 minutes |
| `/api/forms` | 10 submissions | 1 hour |
| All other API | 100 requests | 1 hour |

### Rate Limit Response

When limit exceeded:

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705334400

{
  "message": "Too many login attempts, please try again later"
}
```

### Disable Rate Limiting in Development

Rate limiting is **automatically disabled** when:
```bash
NODE_ENV=development
```

---

## 🔍 Input Validation Examples

### Username Validation

**Valid:**
- ✅ `john_doe` (3-50 chars, alphanumeric + underscore)
- ✅ `admin123`
- ✅ `user_name_123`

**Invalid:**
- ❌ `ab` (too short, min 3)
- ❌ `user@name` (special characters not allowed)
- ❌ `user-name` (hyphen not allowed)

### Password Validation

**Valid:**
- ✅ `SecurePass123!`
- ✅ `MyPassword@2024`
- ✅ `Admin#Password99`

**Invalid:**
- ❌ `password` (no uppercase, numbers, special chars)
- ❌ `Pass123` (no special character)
- ❌ `Pass1!` (too short)
- ❌ `password123` (no uppercase or special char)

### Email Validation

**Valid:**
- ✅ `user@example.com`
- ✅ `john.doe@company.co.uk`
- ✅ `test+tag@gmail.com`

**Invalid:**
- ❌ `user@example` (missing TLD)
- ❌ `@example.com` (missing local part)
- ❌ `user@.com` (missing domain)

---

## 🛡️ Error Handling

### Validation Error Response

```json
HTTP/1.1 400 Bad Request

{
  "message": "Validation failed",
  "errors": [
    {
      "field": "password",
      "message": "Password must contain at least one uppercase letter"
    },
    {
      "field": "password",
      "message": "Password must contain at least one special character (!@#$%^&*)"
    }
  ]
}
```

### Authentication Error Response

```json
HTTP/1.1 401 Unauthorized

{
  "message": "Access token required"
}
```

### Authorization Error Response

```json
HTTP/1.1 403 Forbidden

{
  "message": "Admin access required"
}
```

---

## 📋 Common Tasks

### Create Admin User on First Startup

**Option 1: Set ADMIN_PASSWORD in .env**
```env
ADMIN_PASSWORD=AdminPass123!
```

Start server - admin user will be created automatically.

**Option 2: Use login endpoint after creation**
Once admin exists, use login to get token, then create other users.

### Generate CSRF Token

**Request:**
```bash
GET /api/csrf-token
```

**Response:**
```json
{
  "csrfToken": "abc123def456..."
}
```

### Update Form Status (Admin)

**Request:**
```bash
PUT /api/forms/{formId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "read"
}
```

Valid statuses: `unread`, `read`, `resolved`

### Test Rate Limiting

```bash
# This will work
curl http://localhost:3001/api/forms -X POST ...

# After 10 requests in 1 hour, you'll get 429
```

---

## 🐛 Troubleshooting

### Server Won't Start

**Error: JWT_SECRET environment variable is required**
- ✓ Set JWT_SECRET in .env file
- ✓ Copy from .env.example and update

**Error: Validation failed**
- ✓ Check password meets requirements
- ✓ Verify username format (alphanumeric + underscore only)
- ✓ Ensure email is valid format

### 429 Rate Limit

**Too many requests?**
- Wait for window to expire (15 minutes for login, 1 hour for others)
- In development, set NODE_ENV=development to disable

**Wrong IP detected?**
- Check if behind proxy - rate limiter uses req.ip
- May need proxy configuration

### File Upload Fails

**File type not allowed?**
- Use only: PDF, DOC, DOCX, JPG, PNG
- Check file extension matches actual type

**File too large?**
- Max 5MB
- Check file size with: `ls -lh filename`

### Token Expired

**Error: Invalid or expired token**
- Generate new token using refresh endpoint
- Or login again to get new token

---

## 📚 Full Documentation

For complete details, see:
- **`SECURITY_HARDENING.md`** - Comprehensive guide
- **`SECURITY_IMPLEMENTATION_SUMMARY.md`** - Implementation details
- **`.env.example`** - Configuration reference

---

## ✅ Verification Checklist

Before going to production:

- [ ] JWT_SECRET set to strong random value
- [ ] NODE_ENV set to production
- [ ] HTTPS/TLS enabled
- [ ] CORS origins updated to production domains
- [ ] Admin user created and password set
- [ ] File uploads directory created
- [ ] Database backups configured
- [ ] Monitoring/logging enabled
- [ ] Security headers verified with securityheaders.com
- [ ] Rate limiting tested

---

**Last Updated**: 2024
**Status**: ✅ Production Ready
