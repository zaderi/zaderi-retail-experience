# Security Hardening Implementation Guide

This document outlines all security improvements implemented for the Zaderi Retail Experience Express server.

## 1. Rate Limiting

### Configured Limits
- **Login Endpoint**: 5 attempts per 15 minutes per IP
- **Form Submissions**: 10 submissions per hour per IP  
- **General API**: 100 requests per hour per IP

### Implementation
- Uses `express-rate-limit` middleware
- Automatically disabled in development mode
- Returns `429 Too Many Requests` when limits exceeded

**Endpoints Protected:**
- `POST /api/auth/login` - Login attempts
- `POST /api/forms` - Form submissions
- All other API endpoints - General rate limit

---

## 2. Input Validation & Sanitization

### Validators Implemented

#### Username Validation
- Required field
- Length: 3-50 characters
- Allowed characters: alphanumeric + underscore only
- Pattern: `/^[a-zA-Z0-9_]+$/`

#### Password Validation (when creating/updating users)
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

#### Email Validation
- Valid email format
- Uses standard email regex validation

#### Form Input Validation
- Name: Max 100 characters
- Email: Valid format
- Phone: Max 20 characters
- Message: Max 2000 characters
- Type: Must be one of: 'contact', 'inquiry', 'support'

#### Input Sanitization
- Removes `<script>` tags from all text fields
- Removes inline event handlers (e.g., `onclick=`)
- Applied to form submissions automatically

### Implementation
- Uses `express-validator` library
- Validation errors return 400 status with detailed error messages
- `handleValidationErrors` middleware processes all validation errors

---

## 3. Security Headers (Helmet)

### Configured Headers

#### Content-Security-Policy (CSP)
```
default-src: 'self'
style-src: 'self', 'unsafe-inline'
script-src: 'self'
img-src: 'self', data:, https:
connect-src: 'self', https://pppmrztsffgqvuvxife.supabase.co
font-src: 'self'
object-src: 'none'
```

#### HTTP Strict-Transport-Security (HSTS)
- Max-age: 31536000 (1 year)
- Include subdomains
- Preload enabled

#### Frame-Guard
- Prevents clickjacking
- Setting: `DENY` (prevents embedding in iframes)

#### X-Content-Type-Options
- Prevents MIME type sniffing
- Setting: `nosniff`

#### Referrer Policy
- Policy: `strict-origin-when-cross-origin`
- Limits referrer information in requests

### Implementation
- Helmet middleware automatically applies all headers
- Applied to all responses globally

---

## 4. CSRF Protection

### Implementation
- Uses `csurf` middleware with cookie strategy
- CSRF token available at `GET /api/csrf-token`
- Required for form submissions that don't use JWT

### Usage
1. Client requests CSRF token: `GET /api/csrf-token`
2. Server returns token: `{ csrfToken: "..." }`
3. Client includes token in form submission
4. Server validates token before processing

### API Endpoints with CSRF Protection
- `PUT /api/content` - Content updates

**Note**: API endpoints using JWT authentication don't require CSRF protection (stateless).

---

## 5. File Upload Security

### Security Features

#### File Type Validation
- Whitelist of allowed extensions: `pdf, doc, docx, jpg, jpeg, png`
- MIME type validation against allowed types
- Extension and MIME must both be valid

#### File Size Limits
- Maximum file size: 5MB
- Enforced at multer level
- Double-checked before response

#### Secure Filename Generation
- Original filename not stored on disk
- Random hex filename generated: `[32-char-hex].[extension]`
- Prevents path traversal attacks
- Prevents file enumeration

#### Storage Location
- Files stored in `/server/uploads/` directory
- Outside of public directory
- Not directly accessible via URL

#### Path Traversal Prevention
- Downloaded files validated against uploads directory
- Filename format: `/^[a-f0-9]{32}\.[a-z]+$/`
- Normalized paths prevent directory escape

### Endpoints

#### Upload File
```
POST /api/upload
Authentication: Required (JWT)
Content-Type: multipart/form-data
Body: { file: File }

Response: {
  filename: "abc123...xyz.pdf",
  originalName: "document.pdf",
  size: 102400,
  path: "/api/files/abc123...xyz.pdf"
}
```

#### Download File
```
GET /api/files/:filename
Authentication: Required (JWT)

Returns: Binary file download
```

### Allowed File Types
- **Documents**: PDF, DOC, DOCX
- **Images**: JPG, JPEG, PNG

---

## 6. JWT Authentication & Token Management

### Security Improvements

#### JWT Secret
- **Required**: Must be set in environment variable `JWT_SECRET`
- **No fallback**: Server fails to start if not configured
- **No hardcoding**: Secret never stored in code

#### Token Expiration
- **Access Token**: 2 hours
- **Refresh Token**: 7 days
- Previous: 24 hours (now reduced)

#### Refresh Token Flow
- Clients receive both `token` and `refreshToken` on login
- When access token expires, use refresh token to get new access token
- Endpoint: `POST /api/auth/refresh`

#### Storage Recommendation
- **Access Token**: In memory or sessionStorage (not localStorage)
- **Refresh Token**: HttpOnly secure cookie (recommended)
- **NOT in localStorage**: Vulnerable to XSS attacks

### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "username": "admin",
    "role": "admin"
  }
}
```

### Refresh Token Endpoint
```
POST /api/auth/refresh
Content-Type: application/json
Body: { "refreshToken": "..." }

Response: { "token": "eyJhbGciOiJIUzI1NiIs..." }
```

---

## 7. Environment Variable Configuration

### Required Variables
- `JWT_SECRET` - Strong, random string (minimum 32 characters)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key

### Optional Variables
- `ADMIN_PASSWORD` - Initial admin password (only used on first startup)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment mode (default: development)

### Generating Strong JWT Secret
```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Example .env File
```
PORT=3001
JWT_SECRET=a7f3k9m2l1p8q4r6s9t2u5v3w1x0y4z7b2c5d8e1f4g7h0i3j6k9l2m5n8o1p4q
NODE_ENV=production
ADMIN_PASSWORD=
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-key-here
```

---

## 8. Removed Vulnerabilities

### Previously Hardcoded Credentials
- ❌ Hardcoded default admin password `hOst@2026` - **REMOVED**
- ❌ Fallback JWT secret `zaderi-secret-key` - **REMOVED**
- ❌ Weak JWT secret in code - **REMOVED**

### Previously Unvalidated Endpoints
- ❌ File uploads without type checking - **SECURED**
- ❌ Form submissions without sanitization - **SECURED**
- ❌ User creation without password validation - **SECURED**
- ❌ No rate limiting on login - **SECURED**

---

## 9. Password Requirements

### For Admin Users
When creating or updating user accounts through the admin panel:

```
Requirement     | Minimum
─────────────────────────────
Length          | 8 characters
Uppercase       | At least 1 (A-Z)
Lowercase       | At least 1 (a-z)
Numbers         | At least 1 (0-9)
Special Chars   | At least 1 (!@#$%^&*)
```

### Example Valid Password
- ✅ `SecurePass123!`
- ✅ `MyPassword@2024`
- ✅ `Admin#Password99`

### Example Invalid Passwords
- ❌ `password` - No uppercase, numbers, special chars
- ❌ `Pass123` - No special character
- ❌ `Pass1!` - Too short

---

## 10. API Security Summary

### Authentication Required
```
GET /api/auth/me ..................... Get current user
GET /api/users ....................... Get all users (admin only)
POST /api/users ....................... Create user (admin only)
PUT /api/users/:id .................... Update user (admin only)
DELETE /api/users/:id ................. Delete user (admin only)
GET /api/forms ........................ Get all forms (authenticated)
PUT /api/forms/:id .................... Update form status (authenticated)
DELETE /api/forms/:id ................. Delete form (authenticated)
GET /api/content ...................... Get content (authenticated)
PUT /api/content ...................... Update content (admin only, CSRF)
POST /api/upload ...................... Upload file (authenticated)
GET /api/files/:filename .............. Download file (authenticated)
```

### Public Endpoints (Unauthenticated)
```
POST /api/auth/login .................. Login (rate limited)
POST /api/forms ....................... Submit form (rate limited, validated)
GET /api/csrf-token ................... Get CSRF token
```

---

## 11. Deployment Checklist

Before deploying to production:

- [ ] Generate strong `JWT_SECRET` using `openssl rand -base64 32`
- [ ] Set `NODE_ENV=production` in environment
- [ ] Ensure `JWT_SECRET` is set as environment variable
- [ ] Enable HTTPS/TLS (required for HSTS to be effective)
- [ ] Set up `.env` file with all required variables
- [ ] Remove `.env.local` and other development files from production
- [ ] Configure CORS origin URLs to production domains only
- [ ] Set up database backups
- [ ] Review and test all rate limiting rules
- [ ] Test file upload restrictions
- [ ] Verify email validation with production email format
- [ ] Configure logging and monitoring
- [ ] Set up automated security patches
- [ ] Enable database access logs
- [ ] Configure WAF (Web Application Firewall) if available

---

## 12. Monitoring & Logging

### Security Events to Monitor
- Failed login attempts (rate limiting hits)
- Invalid form submissions
- File upload rejections
- Database errors
- Authentication failures

### Recommended Monitoring
- Track rate limit triggers per IP
- Log all admin operations (user creation, deletion, content updates)
- Monitor failed JWT validations
- Track file upload attempts and rejections

---

## 13. Future Security Enhancements

### Recommended Additions
1. **Two-Factor Authentication (2FA)**
   - TOTP implementation
   - Backup codes

2. **API Key Authentication**
   - For service-to-service communication
   - Key rotation mechanism

3. **Audit Logging**
   - Track all data modifications
   - User action history
   - Change timestamps

4. **DDoS Protection**
   - CloudFlare or similar service
   - Advanced rate limiting

5. **Data Encryption**
   - Encrypt sensitive fields in database
   - Field-level encryption for PII

6. **Security Headers**
   - Implement Subresource Integrity (SRI)
   - Public-Key-Pins (HPKP)

---

## 14. Support & Questions

For questions about security implementation, refer to:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)

---

**Last Updated**: 2024
**Security Level**: Production-Ready
**Compliance**: OWASP Top 10 mitigation measures
