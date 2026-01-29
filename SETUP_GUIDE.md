# Setup Guide - External Services

This guide will help you set up the required external services for the Digital Agency application.

---

## 1. MongoDB Atlas Setup

MongoDB Atlas is the cloud database service we'll use for storing projects, clients, contacts, and subscriptions.

### Steps:

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up with email or Google account
   - Verify your email

2. **Create a Cluster**
   - After login, click "Create a Deployment"
   - Select "M0 Shared" (Free tier)
   - Choose a cloud provider (AWS recommended) and region close to you
   - Click "Create Cluster"
   - Wait 1-3 minutes for cluster to deploy

3. **Create Database User**
   - Go to "Security" → "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate a strong password (save it!)
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Security" → "Network Access"
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Databases" and click "Connect"
   - Select "Drivers"
   - Choose "Node.js" and version 4.0+
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database_name>` with your values
   - This is your `MONGODB_URI` for `.env`

### Example Connection String:
```
mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/digital-agency?retryWrites=true&w=majority
```

---

## 2. Cloudinary Setup

Cloudinary is used for image storage and transformation.

### Steps:

1. **Create Account**
   - Go to https://cloudinary.com/users/register/free
   - Sign up with email or Google account
   - Verify your email

2. **Get API Keys**
   - After login, go to your Dashboard
   - You'll see:
     - `Cloud Name`
     - `API Key`
     - `API Secret`
   - Save these values for your `.env` file

3. **Create Upload Preset** (Optional but recommended)
   - Go to "Settings" → "Upload"
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Naming Mode: `Unsigned`
   - Name: `digital_agency`
   - Save the preset name

### Environment Variables Needed:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 3. Firebase Setup

Firebase is used for Google Sign-in authentication on the landing page.

### Steps:

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com/
   - Click "Add Project"
   - Project name: `digital-agency`
   - Accept terms and click "Create Project"
   - Wait for project to be created

2. **Enable Google Sign-in**
   - Go to "Build" → "Authentication"
   - Click "Get Started"
   - Click "Google" provider
   - Toggle "Enable"
   - Set up OAuth consent screen (if prompted):
     - User Type: `External`
     - Add your email as test user
   - Click "Save"

3. **Create Web App**
   - Click the Web icon `</>` in the project overview
   - App nickname: `digital-agency-web`
   - Click "Register app"
   - Copy the Firebase config object
   - This is your `firebaseConfig` for frontend

### Firebase Config Example:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

4. **Get Web API Key**
   - Go to "Settings" (gear icon) → "Project Settings"
   - Copy the `apiKey` value
   - Use this in your firebaseConfig

---

## Environment Variables Template

Create `.env` files in `backend/` and `frontend/` folders with the following variables:

### Backend (.env)
```
MONGODB_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/digital-agency?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_PASSWORD=admin123
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

---

## Quick Checklist

- [ ] MongoDB Atlas account created and cluster deployed
- [ ] Database user created with username and password
- [ ] Network access configured (allow from anywhere for dev)
- [ ] Connection string saved
- [ ] Cloudinary account created
- [ ] API keys saved (Cloud Name, API Key, API Secret)
- [ ] Firebase project created
- [ ] Google Sign-in enabled in Firebase
- [ ] Web app registered in Firebase
- [ ] Firebase config saved
- [ ] `.env` files created in both frontend and backend

---

Once all external services are configured, you can proceed with the backend and frontend setup!
