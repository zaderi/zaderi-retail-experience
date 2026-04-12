# Deployment Instructions for Zaderi Technologies

## Architecture Overview

- **Frontend**: Deployed at `www.zaderitechnologies.com` (static site)
- **Backend API**: Needs to be deployed separately (Node.js/Express)
- **Admin Panel**: Accessible at `/adminpanel` on the frontend

## Step 1: Deploy Backend to Render.com (Free)

### 1. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub account
3. Authorize Render to access your GitHub repos

### 2. Deploy Backend Service
1. Dashboard → "New +" → "Web Service"
2. Connect your `zaderi-retail-experience` repository
3. Configure the service:
   - **Name**: `zaderi-api-server` (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free (or paid if needed)
4. Click "Create Web Service"

### 3. Copy Backend URL
After deployment completes, you'll see a URL like:
```
https://zaderi-api-server.onrender.com
```

**Save this URL** - you'll need it in the next step.

## Step 2: Update Frontend Environment Variables

### For Production Build
1. Update `.env.production` file:
   ```env
   VITE_API_URL=https://zaderi-api-server.onrender.com
   ```
   (Replace the domain with your actual Render.com backend URL)

2. Rebuild the frontend:
   ```bash
   npm run build
   ```

3. Deploy the new build to your hosting (wherever `www.zaderitechnologies.com` is hosted)

### For Local Development
- The Vite proxy handles `/api` calls automatically (no env var needed)
- Run `npm run fullstack` to start both frontend and backend locally

## Step 3: Verify Everything Works

### Admin Panel
1. Go to `https://www.zaderitechnologies.com/adminpanel`
2. Log in with:
   - Username: `admin`
   - Password: `hOst@2026`

### Form Submissions
1. Submit a form on the main site
2. Check the admin panel to see the submission
3. Forms should be saved without any "Failed to submit" errors

## Troubleshooting

### Forms Still Failing
- Check that `.env.production` has the correct `VITE_API_URL`
- Verify the backend is running on Render.com
- Check browser console for CORS errors
- Ensure the build was done after updating env vars

### Admin Panel Not Loading
- Verify Render backend is deployed and running
- Check that auth endpoint responds: `https://your-backend-url/api/auth/login`
- Clear browser cache and localStorage

### Render Deployment Failed
- Check Render logs for errors
- Ensure `render.yaml` is in the repo root
- Verify `server/package.json` has all required dependencies
- Check that `npm start` works locally in the server directory

## Environment Variables Reference

### Frontend (.env.production)
```env
VITE_API_URL=<your-deployed-backend-url>
```

### Backend (server/.env) - Optional
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=zaderi-secret-key  # Change this in production!
```

## Security Notes

- Change the JWT_SECRET in production
- Use HTTPS URLs only
- Consider enabling CORS restrictions on the backend
- Add proper authentication to sensitive endpoints

## Support

If you need to make changes:

1. **Backend changes**: Push to GitHub → Render auto-deploys
2. **Frontend changes**: 
   - Update code
   - If env vars changed: update `.env.production`
   - Run `npm run build`
   - Deploy new build to your hosting
