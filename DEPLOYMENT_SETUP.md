# 🚀 Complete Deployment Setup Guide

## Status
- ✅ Security hardening: **COMPLETE**
- ✅ Packages installed: **COMPLETE**
- ⏳ Supabase tables: **PENDING**
- ⏳ Admin credentials: **PENDING**

---

## Step 1: Supabase Database Setup (2 minutes)

### Option A: Using Supabase Dashboard (Easiest)

1. Go to https://app.supabase.com
2. Select your project: `pppmrztsffgqvuvxife`
3. Open **SQL Editor** on the left sidebar
4. Click **New Query**
5. Copy and paste the entire content from `supabase-setup.sql`
6. Click **Run** (or Ctrl+Enter)
7. You should see: ✅ "Executed successfully"

### Option B: Using psql CLI (If available)

```bash
psql -h pppmrztsffgqvuvxife.supabase.co \
     -U postgres \
     -d postgres \
     -f supabase-setup.sql
```

### Verify Setup
```sql
-- Run this in Supabase SQL Editor to verify
SELECT * FROM users;  -- Should show 1 row with admin user
SELECT * FROM forms;  -- Should be empty
```

---

## Step 2: Environment Variables (Already Done ✅)

Your `.env` files are already configured:

**`server/.env`** (Backend)
```
PORT=3001
JWT_SECRET=a_very_secure_jwt_secret_change_this_in_production_use_openssl_rand_base64_32
NODE_ENV=development
SUPABASE_URL=https://pppmrztsffgqvuvxife.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**`.env`** (Frontend)
```
VITE_SUPABASE_URL=https://pppmrztsffgqvuvxife.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 3: Start the Application

### Start Backend Server
```bash
cd server
npm install  # If not already done
npm start
```

You should see:
```
✓ Server running on port 3001
✓ Security features enabled
✓ Users table is accessible
✓ Forms table is accessible
✓ Default admin user created
```

### Start Frontend (in another terminal)
```bash
npm run dev
```

---

## Step 4: Access Admin Panel

1. **Local development**: http://localhost:5173/adminpanel
2. **Production**: https://www.zaderitechnologies.com/adminpanel

### Login Credentials
```
Username: admin
Password: [Check your Supabase users table]
```

**Default hashed password in database:**
```
$2a$10$yDVrFPgTBz4fVhuzOJuBSed76h006i2q/EIWNCgTzrdpvW7gp3Q16
```

If you need to reset:
1. Generate new hash using bcrypt online: https://bcryptgenerator.com (use cost 10)
2. Update in Supabase:
   ```sql
   UPDATE users SET password = 'NEW_HASH_HERE' WHERE username = 'admin';
   ```

---

## Step 5: Security Features

Your application now has:

| Feature | Status |
|---------|--------|
| Rate limiting (login: 5/15min) | ✅ Active |
| Rate limiting (forms: 10/hour) | ✅ Active |
| Security headers (Helmet) | ✅ Active |
| Input validation | ✅ Active |
| JWT authentication | ✅ Active |
| CSRF protection | ✅ Active |
| File upload security | ✅ Active |
| Password hashing (bcrypt) | ✅ Active |

---

## Troubleshooting

### ❌ "Invalid credentials" on login
**Solution:** Supabase tables not created. Run Step 1.

### ❌ "Too many login attempts"
**Solution:** Rate limiter is active. Wait 15 minutes or set `NODE_ENV=development` in `.env`

### ❌ "Users table does not exist"
**Solution:** Check Supabase SQL Editor for errors. Run `supabase-setup.sql` again.

### ❌ "CORS error" or "Network error"
**Solution:** Frontend can't reach backend. Check:
- Backend is running on `http://localhost:3001`
- Frontend is on `http://localhost:5173` or appropriate domain
- CORS origins in `server/server.js` are correct

### ✅ Forms not saving?
**Tip:** Check Supabase `forms` table - they're stored there!

---

## Production Deployment

### For Vercel/Render:

1. **Update `server/.env` with production values:**
   ```
   NODE_ENV=production
   JWT_SECRET=[Generate new: openssl rand -base64 32]
   SUPABASE_URL=[Your production Supabase URL]
   SUPABASE_ANON_KEY=[Your production key]
   ```

2. **Update frontend CORS origins in `server/server.js`:**
   ```javascript
   origin: [
     'https://www.yourdomain.com',
     'https://yourdomain.com',
     'https://your-deployed-frontend.com'
   ]
   ```

3. **Ensure HTTPS/TLS enabled** (for HSTS security header)

4. **Deploy backend and frontend**

---

## Next Steps

- [ ] Run `supabase-setup.sql` in Supabase dashboard
- [ ] Start backend server (`npm start` in `server/` folder)
- [ ] Start frontend (`npm run dev`)
- [ ] Visit http://localhost:5173/adminpanel
- [ ] Login with admin credentials
- [ ] Test form submissions
- [ ] Check Supabase tables for data

**Estimated time: 15 minutes** ⏱️

---

**Questions?** Check `SECURITY_README.md` for security details.
