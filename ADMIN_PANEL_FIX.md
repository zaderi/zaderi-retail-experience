# 🔧 ADMIN PANEL FIX - Database Access Issue

## Problem
Tables exist but admin login shows "Invalid credentials" - this is a **Row Level Security (RLS) issue**

## Solution (2 minutes)

### Step 1: Run the RLS Fix SQL

1. Go to: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** → **New Query**
4. **Copy ALL content from:** `FIX_RLS.sql`
5. **Paste and click RUN**
6. Wait for ✅ success

### Step 2: Test Login Again

```
URL: http://localhost:5173/adminpanel
Username: admin
Password: hOst@2026
```

---

## What the Fix Does

**Disables Row Level Security (RLS)** on the users and forms tables.

This allows your frontend to query the database using the ANON_KEY.

---

## Why It Wasn't Working

- ✅ Tables exist
- ✅ Users exist  
- ✅ Password hashes are correct
- ❌ RLS policies were blocking SELECT queries
- ❌ Your app couldn't read the users table

---

## After Fix

✅ Admin panel will work
✅ Login will succeed
✅ You can manage users and forms

---

## Commands to Test

```bash
# In terminal
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"hOst@2026"}'

# Should return: {"token":"...", "user":{...}}
```

---

**Next: Run the SQL fix and login!** 👉
