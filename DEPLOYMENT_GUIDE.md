# Deployment Guide

## Overview

This guide covers deploying the Digital Agency application to production using:
- **Frontend:** Vercel (free tier)
- **Backend:** Render or Railway (free tier)
- **Database:** MongoDB Atlas (free tier)
- **Image Storage:** Cloudinary (free tier)

---

## Prerequisites

Before deploying, ensure you have:

1. **GitHub Repository:**
   - Create a GitHub account at https://github.com
   - Create a new repository for this project
   - Push your code to GitHub

2. **All External Services Configured:**
   - MongoDB Atlas cluster created
   - Cloudinary account with API keys
   - Firebase project created (optional)

3. **Environment Variables Ready:**
   - All `.env` variables documented
   - No secrets hardcoded in code

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

1. **Create `.env` template for Render:**
   ```bash
   cd backend
   # Verify .env.example exists and has all required variables
   cat .env.example
   ```

2. **Verify package.json has correct start script:**
   ```json
   "scripts": {
     "dev": "nodemon server.js",
     "start": "node server.js"
   }
   ```

### Step 2: Create Render Account

1. Go to https://render.com
2. Click "Sign up"
3. Sign up with GitHub (recommended for easy deployment)
4. Authorize Render to access your GitHub account

### Step 3: Create New Web Service

1. **Dashboard → New+ → Web Service**

2. **Connect Repository:**
   - Select your GitHub repository
   - Click "Connect"

3. **Configure Service:**
   - **Name:** `digital-agency-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

4. **Add Environment Variables:**
   Click "Advanced" and add:
   
   ```
   MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/digital-agency?retryWrites=true&w=majority
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   
   CLOUDINARY_API_KEY=your_api_key
   
   CLOUDINARY_API_SECRET=your_api_secret
   
   ADMIN_PASSWORD=admin123
   
   PORT=5000
   
   NODE_ENV=production
   
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for build to complete (5-10 minutes)
   - You'll get a URL like: `https://digital-agency-backend-xxxxx.onrender.com`

### Step 4: Verify Backend Deployment

```bash
# Test health check
curl https://digital-agency-backend-xxxxx.onrender.com/api/v1/health

# Expected Response:
# {"success":true,"message":"Server is running","timestamp":"..."}
```

### Step 5: Important Notes

⚠️ **Free Tier Limitations:**
- Server goes to sleep after 15 minutes of inactivity
- Takes 30 seconds to wake up on first request
- Redeploys on code push (automatic with GitHub)

💡 **Pro Tip:** Use a service like https://uptimerobot.com to ping your backend every 5 minutes to prevent sleep

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend for Deployment

1. **Build and test locally:**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

2. **Verify environment variables are correct in `.env`:**
   ```
   VITE_API_BASE_URL=https://digital-agency-backend-xxxxx.onrender.com/api/v1
   VITE_FIREBASE_API_KEY=your_api_key
   # ... other Firebase variables
   ```

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your GitHub account

### Step 3: Deploy to Vercel

1. **Dashboard → Add New... → Project**

2. **Import Repository:**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - **Project Name:** `digital-agency`
   - **Framework:** `Vite`
   - **Root Directory:** `./frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add each variable from your `.env` file:
   
   ```
   VITE_API_BASE_URL = https://digital-agency-backend-xxxxx.onrender.com/api/v1
   
   VITE_FIREBASE_API_KEY = your_api_key
   
   VITE_FIREBASE_AUTH_DOMAIN = your_project.firebaseapp.com
   
   VITE_FIREBASE_PROJECT_ID = your_project_id
   
   VITE_FIREBASE_STORAGE_BUCKET = your_project.appspot.com
   
   VITE_FIREBASE_MESSAGING_SENDER_ID = your_sender_id
   
   VITE_FIREBASE_APP_ID = your_app_id
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Get a URL like: `https://digital-agency-xxxxx.vercel.app`

### Step 4: Custom Domain (Optional)

1. **Add domain in Vercel:**
   - Project Settings → Domains
   - Add your custom domain
   - Follow DNS setup instructions

### Step 5: Update Backend URL

After deploying backend and frontend, update:

1. **Backend `.env` on Render:**
   - Set `FRONTEND_URL=https://your-frontend-domain.vercel.app`

2. **Frontend `.env` on Vercel:**
   - Set `VITE_API_BASE_URL=https://your-backend-domain.onrender.com/api/v1`

3. Redeploy both services

---

## Part 3: Post-Deployment Testing

### Step 1: Test Live Landing Page

1. Open: `https://your-vercel-domain.vercel.app`
2. Test all sections (Hero, Projects, Testimonials, Contact, Newsletter)
3. Submit contact form → Should appear in admin panel
4. Subscribe to newsletter → Should appear in subscribers list

### Step 2: Test Live Admin Panel

1. Open: `https://your-vercel-domain.vercel.app/admin`
2. Enter password: `admin123`
3. Add project with image
4. Add client testimonial
5. Check contact inquiries
6. Check subscribers
7. Go back to landing page → New project and client should be visible

### Step 3: Monitor Logs

**Render:**
- Dashboard → Select service → Logs
- Check for any errors

**Vercel:**
- Dashboard → Select project → Deployments → Logs
- Check build logs and runtime logs

---

## Part 4: Troubleshooting Deployment

### Issue: Backend deployment fails

**Solution:**
- Check build logs for errors
- Verify `.env` variables are set
- Ensure `server.js` is in the root of backend folder
- Check that all dependencies are in `package.json`

### Issue: Frontend build fails

**Solution:**
- Verify Node.js version compatibility (need 18+)
- Check for TypeScript errors
- Ensure all imports are correct
- Check environment variable syntax (must start with `VITE_`)

### Issue: API calls fail after deployment

**Solution:**
- Verify `VITE_API_BASE_URL` is correct
- Check backend is running (visit health endpoint)
- Verify CORS is configured correctly
- Check browser console for errors

### Issue: Images not loading

**Solution:**
- Verify Cloudinary credentials are correct
- Check Cloudinary account has enough monthly transformations
- Verify image URLs in database are valid
- Check browser console for 404 errors

### Issue: Admin authentication not working

**Solution:**
- Verify `ADMIN_PASSWORD` environment variable is set
- Check that password matches on frontend and backend
- Clear browser localStorage and try again
- Check network tab to see actual token being sent

---

## Monitoring & Maintenance

### Set Up Uptime Monitoring

**For Backend (Render):**
1. Go to https://uptimerobot.com
2. Create new monitor
3. URL: `https://your-backend.onrender.com/api/v1/health`
4. Check interval: 5 minutes
5. Get alerts if backend goes down

### Regular Tasks

- **Weekly:** Check error logs in Render and Vercel
- **Monthly:** Check Cloudinary usage (25 transformations/month limit)
- **Monthly:** Check MongoDB Atlas storage (512MB free limit)
- **As needed:** Update environment variables when credentials change

### Scaling (If Needed)

If your free tier limits are exceeded:

**Backend:** Upgrade from Render free to paid tier ($7/month+)
**Frontend:** Free tier is usually sufficient; upgrade if needed
**Database:** Upgrade MongoDB Atlas cluster ($0 → paid)
**Images:** Upgrade Cloudinary plan or migrate to AWS S3

---

## Deployment Checklist

- [ ] Code pushed to GitHub repository
- [ ] Backend deployed to Render with all env variables
- [ ] Frontend deployed to Vercel with all env variables
- [ ] Health check endpoint returns 200
- [ ] Landing page loads and displays content
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Admin panel authentication works
- [ ] Projects display with images
- [ ] Testimonials display with images
- [ ] All API endpoints respond correctly
- [ ] No console errors on landing page
- [ ] No console errors on admin panel
- [ ] Responsive design works on mobile
- [ ] Form validations working
- [ ] Database queries returning data

---

## Production Best Practices

1. **Security:**
   - Never commit `.env` files to GitHub
   - Use strong admin password (change from `admin123`)
   - Enable rate limiting on API endpoints
   - Use HTTPS everywhere (automatic on Vercel/Render)

2. **Performance:**
   - Enable caching headers
   - Compress images (Sharp handles this)
   - Minify frontend code (Vite does this)
   - Monitor database query performance

3. **Monitoring:**
   - Set up error logging (Sentry recommended)
   - Monitor API response times
   - Set up alerts for critical errors
   - Regular database backups (MongoDB Atlas default)

4. **Maintenance:**
   - Keep dependencies updated
   - Review and update security patches
   - Monitor usage of free tier limits
   - Plan for scaling as traffic grows

---

## Support & Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com
- **Cloudinary Docs:** https://cloudinary.com/documentation

---

**Your Digital Agency application is now live in production!** 🚀
