# Quick Start Guide

Get your Digital Agency application running in 5 minutes!

## Prerequisites

- Node.js 16+ (or use online editor like Replit)
- npm or yarn
- Code editor (VSCode recommended)

## Step 1: Setup External Services (5 minutes)

### MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create M0 free cluster
4. Create database user: `admin` / (strong password)
5. Get connection string: `mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/digital-agency?retryWrites=true&w=majority`

### Cloudinary
1. Go to https://cloudinary.com
2. Sign up free
3. Copy: `Cloud Name`, `API Key`, `API Secret` from dashboard

### Firebase (Optional)
1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Google Sign-in
4. Copy Firebase config object

## Step 2: Configure Environment Variables

### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_PASSWORD=admin123
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=your_api_key (optional)
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com (optional)
# ... add other Firebase config if needed
```

## Step 3: Install Dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Step 4: Start Development Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Expected output:
```
╔════════════════════════════════════════════════════════════╗
║     Digital Agency Backend Server Running                 ║
║     Server: http://localhost:5000                        ║
║     Environment: development                             ║
╚════════════════════════════════════════════════════════════╝
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

## Step 5: Test the Application

1. **Open browser:** http://localhost:5173
2. **Landing Page:**
   - Scroll through sections
   - Submit contact form (will appear in admin)
   - Subscribe to newsletter (will appear in admin)

3. **Admin Panel:**
   - Go to: http://localhost:5173/admin
   - Password: `admin123`
   - Add projects with images (use image cropper)
   - Add client testimonials
   - View inquiries and subscribers

4. **Verify Backend:**
   - Health check: http://localhost:5000/api/v1/health
   - Should return: `{"success": true, "message": "Server is running"}`

## What's Included

✅ **Frontend:**
- React.js with Vite
- Responsive landing page
- Admin panel with authentication
- Image cropping tool (bonus feature)
- Form validation
- Toast notifications
- Tailwind CSS styling

✅ **Backend:**
- Express.js REST API
- MongoDB integration
- Image processing with Sharp
- Cloudinary integration
- Admin authentication middleware
- Error handling

✅ **Features:**
- Projects showcase with images
- Client testimonials
- Contact form
- Newsletter subscription
- Admin CRUD operations
- Image cropping and resizing

## Project Structure

```
digital-agency/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # Express API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── plan.md
├── README.md
├── SETUP_GUIDE.md
├── TESTING_GUIDE.md
└── DEPLOYMENT_GUIDE.md
```

## Common Commands

```bash
# Start backend dev server
cd backend && npm run dev

# Start frontend dev server
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Preview production build
cd frontend && npm run preview
```

## Troubleshooting

### Backend won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Frontend port 5173 in use
```bash
# Kill process or specify different port
npm run dev -- --port 5174
```

### MongoDB connection fails
- Check connection string in `.env`
- Verify IP whitelist in MongoDB Atlas (0.0.0.0/0 for dev)
- Check username and password

### Images not uploading
- Verify Cloudinary API keys
- Check file is valid image format
- Check free tier limit (25/month)

## Next Steps

1. **Develop:**
   - Add more features
   - Customize styling
   - Add more pages

2. **Test:**
   - Follow TESTING_GUIDE.md
   - Test all features
   - Fix any issues

3. **Deploy:**
   - Follow DEPLOYMENT_GUIDE.md
   - Deploy to Vercel (frontend) & Render (backend)
   - Configure production environment variables

4. **Maintain:**
   - Monitor logs
   - Update dependencies
   - Scale infrastructure as needed

## Support Files

- **plan.md** - Complete project plan
- **SETUP_GUIDE.md** - External services setup
- **TESTING_GUIDE.md** - Comprehensive testing guide
- **DEPLOYMENT_GUIDE.md** - Production deployment guide
- **README.md** - Project overview

## Admin Access

- **URL:** http://localhost:5173/admin
- **Password:** `admin123`

**⚠️ Change this password before deploying to production!**

---

**Ready to go! Happy building!** 🚀
