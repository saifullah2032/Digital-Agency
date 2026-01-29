# 🧪 End-to-End Testing Checklist

## Setup Instructions

### 1. Start Backend Server
Open a terminal and run:
```bash
cd "C:\Users\rayan\Downloads\Digital Agency\backend"
npm run dev
```

Expected output:
```
✓ Server running on http://localhost:5000
✓ MongoDB connected
```

### 2. Start Frontend Dev Server
Open another terminal and run:
```bash
cd "C:\Users\rayan\Downloads\Digital Agency\frontend"
npm run dev
```

Expected output:
```
✓ VITE Application running at http://localhost:5173
```

---

## Testing Checklist

### ✅ Phase 1: Backend API Verification

**Test 1.1: Backend Health Check**
- Open: `http://localhost:5000/api/v1/health` (if available)
- Expected: Server responds without errors

**Test 1.2: Get Portfolio Projects**
- Open: `http://localhost:5000/api/v1/projects`
- Expected: JSON array with 6 portfolio projects

**Test 1.3: Get Portfolio Clients**
- Open: `http://localhost:5000/api/v1/clients`
- Expected: JSON array with 6 client testimonials

---

### ✅ Phase 2: Landing Page Testing

**Test 2.1: Landing Page Loads**
- Navigate to: `http://localhost:5173`
- Expected:
  - ✓ Page loads without console errors
  - ✓ Navigation bar visible
  - ✓ All sections visible when scrolling

**Test 2.2: Navigation Bar**
- Check elements:
  - ✓ Logo/Brand name
  - ✓ Navigation links (Home, Services, Projects, Testimonials, Contact)
  - ✓ "Client Login" button (cyan/blue)
  - ✓ "Admin" button (if already admin logged in)

**Test 2.3: Hero Section**
- Check:
  - ✓ Hero image/background
  - ✓ Main headline and subtitle
  - ✓ "Get Started" button works
  - ✓ Call-to-action visible

**Test 2.4: Services Section**
- Check:
  - ✓ Shows 6 services (Web Design, Development, etc.)
  - ✓ Icons display correctly
  - ✓ Service descriptions visible
  - ✓ Cards are responsive

**Test 2.5: Projects Showcase**
- Check:
  - ✓ Shows portfolio projects from MongoDB
  - ✓ Project images load
  - ✓ Project titles and descriptions visible
  - ✓ Responsive grid layout

**Test 2.6: Testimonials Section**
- Check:
  - ✓ Shows client testimonials from MongoDB
  - ✓ Star ratings visible
  - ✓ Client names and companies shown
  - ✓ Slider/pagination works (if applicable)

**Test 2.7: Contact Form**
- Try submitting a test message:
  - ✓ Form validates input (required fields)
  - ✓ Submit button works
  - ✓ Toast notification appears on success
  - ✓ Check MongoDB Contacts collection for new entry

**Test 2.8: Newsletter Subscription**
- Try subscribing:
  - ✓ Email validation works
  - ✓ Submit button works
  - ✓ Toast notification appears on success
  - ✓ Check MongoDB Subscriptions collection for new entry

**Test 2.9: Footer**
- Check:
  - ✓ Company info visible
  - ✓ Links work
  - ✓ Copyright notice

---

### ✅ Phase 3: Client Authentication Testing

**Test 3.1: Navigate to Login Page**
- Click "Client Login" button on navbar
- Navigate to: `http://localhost:5173/login`
- Expected:
  - ✓ Login page loads
  - ✓ "Sign in with Google" button visible
  - ✓ No console errors

**Test 3.2: Test Google Sign-In**
- Click "Sign in with Google" button
- Expected:
  - ✓ Google login popup appears
  - ✓ Can select Google account
  - ✓ Redirected to client dashboard after login
  - ✓ User email shown in dashboard header

**Test 3.3: Session Persistence**
- After login, refresh the page (`F5`)
- Expected:
  - ✓ Still logged in
  - ✓ Dashboard data loads
  - ✓ No re-authentication needed

---

### ✅ Phase 4: Client Dashboard Testing

**Test 4.1: Dashboard Loads**
- Navigate to: `http://localhost:5173/client-dashboard`
- Expected:
  - ✓ Dashboard loads (requires login)
  - ✓ Tabs visible: Projects, Messages, Files, Profile
  - ✓ Welcome message shows user's name
  - ✓ Statistics cards visible

**Test 4.2: Dashboard Statistics**
- Check the stat cards:
  - ✓ Active Projects count
  - ✓ Unread Messages count
  - ✓ Shared Files count
  - ✓ Team Members count
  - Expected values: 3, 4, 5, (variable)

**Test 4.3: Projects Tab**
- Click "Projects" tab
- Expected:
  - ✓ Shows projects assigned to logged-in client
  - ✓ Displays: Project name, description, status, progress
  - ✓ Shows milestones for each project
  - ✓ Team members listed
  - ✓ Technologies displayed
  - ✓ Timeline/dates shown

**Test 4.4: Click on a Project**
- Click on one of the projects
- Expected:
  - ✓ Project details expand or modal opens
  - ✓ All details visible (milestones, team, tech stack)
  - ✓ Can close the project details

---

### ✅ Phase 5: Messaging Feature Testing

**Test 5.1: Messages Tab**
- Click "Messages" tab in client dashboard
- Expected:
  - ✓ Shows existing messages from MongoDB
  - ✓ Messages show timestamps
  - ✓ Admin messages are highlighted differently from client messages
  - ✓ Unread messages marked as new

**Test 5.2: Send a Message**
- Type a message in the input field
- Click "Send" button
- Expected:
  - ✓ Message appears in chat
  - ✓ Toast notification shows success
  - ✓ Message timestamp updates
  - ✓ Message persists after page refresh

**Test 5.3: Mark Message as Read**
- Click on an unread message
- Expected:
  - ✓ Message marked as read
  - ✓ Visual indicator changes (no longer "new")
  - ✓ Unread count in header updates

**Test 5.4: Real-time Behavior (if WebSocket enabled)**
- Send message from another browser/tab
- Expected:
  - ✓ New message appears instantly in dashboard
  - ✓ Unread count updates

---

### ✅ Phase 6: File Sharing Testing

**Test 6.1: Files Tab**
- Click "Files" tab in client dashboard
- Expected:
  - ✓ Shows existing files from MongoDB
  - ✓ File names, sizes, and upload dates visible
  - ✓ File descriptions shown
  - ✓ Uploader information displayed

**Test 6.2: Upload a File**
- Click "Upload File" button
- Select a test file (PDF, image, or document)
- Expected:
  - ✓ File selected and displays in upload area
  - ✓ File size shows correctly
  - ✓ Can add description
  - ✓ Upload button works
  - ✓ File appears in Files list after upload

**Test 6.3: Download a File**
- Click download icon next to a file
- Expected:
  - ✓ File downloads to your computer
  - ✓ File can be opened and is not corrupted
  - ✓ Download works for multiple file types

**Test 6.4: Delete a File**
- Click delete icon next to a file
- Expected:
  - ✓ Confirmation dialog appears
  - ✓ File is deleted from list
  - ✓ File is removed from MongoDB
  - ✓ Toast notification shows success

---

### ✅ Phase 7: Admin Dashboard Testing

**Test 7.1: Access Admin Dashboard**
- Click "Admin" button in navbar (or go to `/admin`)
- Expected:
  - ✓ Redirected to admin panel
  - ✓ Password prompt appears (if not already authenticated)

**Test 7.2: Enter Admin Password**
- Type: `admin123`
- Expected:
  - ✓ Authentication succeeds
  - ✓ Admin dashboard loads

**Test 7.3: Dashboard Tab (Analytics)**
- Click "Dashboard" tab in admin panel
- Expected:
  - ✓ Statistics overview cards visible
  - ✓ Shows: Total Projects, Total Clients, Total Inquiries, Total Subscribers
  - ✓ Recent contacts and subscribers listed
  - ✓ Unread messages count shown
  - ✓ Active/Client projects count shown

**Test 7.4: Analytics Charts**
- Check the charts displayed:
  - ✓ Portfolio Projects Status (Pie chart)
  - ✓ Client Projects Status (Pie chart)
  - ✓ Contact Inquiries Trend (Line chart - 30 days)
  - ✓ Subscribers Trend (Line chart - 30 days)
  - ✓ All charts render without errors
  - ✓ Charts are interactive (hover shows data)

**Test 7.5: Top Clients Table**
- Check:
  - ✓ Shows highest-rated clients
  - ✓ Displays: Client name, company, rating, testimonial snippet
  - ✓ Data matches MongoDB records

**Test 7.6: Projects Tab**
- Click "Projects" tab
- Expected:
  - ✓ Shows all portfolio projects
  - ✓ Can add, edit, delete projects
  - ✓ Image upload works
  - ✓ Image cropper functions correctly (450x350 aspect ratio)

**Test 7.7: Clients Tab**
- Click "Clients" tab
- Expected:
  - ✓ Shows all client testimonials
  - ✓ Can add, edit, delete clients
  - ✓ Rating system works (1-5 stars)

**Test 7.8: Inquiries Tab**
- Click "Inquiries" tab
- Expected:
  - ✓ Shows all contact form submissions
  - ✓ Displays: Name, email, subject, message, date
  - ✓ Can mark as read/archived
  - ✓ Can delete inquiries

**Test 7.9: Subscribers Tab**
- Click "Subscribers" tab
- Expected:
  - ✓ Shows all newsletter subscribers
  - ✓ Displays: Email, subscription date
  - ✓ Can delete subscribers
  - ✓ Can export list (if feature available)

---

### ✅ Phase 8: Email Notifications Testing (Current Setup)

**Test 8.1: Check Email Service Status**
- Backend is using **Ethereal (test SMTP)** for development
- Run backend and check console for email logs

**Test 8.2: Trigger a Welcome Email**
- Send a POST request to:
  ```
  POST http://localhost:5000/api/v1/client/welcome-email
  Body: { "email": "client@example.com" }
  ```
- Expected:
  - ✓ Response shows success message
  - ✓ Check Ethereal dashboard (emails are logged)
  - ✓ No errors in backend console

**Test 8.3: Test New Message Notification**
- Send a message from client dashboard
- Expected:
  - ✓ Check backend console for email logs
  - ✓ Email should have been triggered
  - ✓ No errors in console

---

## Phase 9: Gmail SMTP Configuration (Production Setup)

### Preparation Steps

**Step 1: Verify Gmail Credentials**
- Gmail Account: `rayankhan2032@gmail.com`
- App Password: `eihv oltr junj zbal` (already configured in .env)

**Step 2: Enable Gmail in Backend .env**
Open `backend/.env` and uncomment/update:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=rayankhan2032@gmail.com
EMAIL_PASSWORD=eihv oltr junj zbal
```

### Configuration Steps

**Test 9.1: Verify Gmail Configuration**
- Open `backend/.env`
- Uncomment the Gmail configuration lines (they're already there!)
- Verify:
  ```env
  EMAIL_SERVICE=gmail
  EMAIL_USER=rayankhan2032@gmail.com
  EMAIL_PASSWORD=eihv oltr junj zbal
  ```

**Test 9.2: Restart Backend with Gmail**
- Stop backend server (Ctrl+C)
- Start backend again: `npm run dev`
- Check console for: "Email service configured with Gmail"

**Test 9.3: Send Test Email**
- Post to: `http://localhost:5000/api/v1/client/welcome-email`
- Body: `{ "email": "your-test-email@gmail.com" }`
- Expected:
  - ✓ Response shows success
  - ✓ Email arrives in inbox within 1-2 minutes
  - ✓ HTML template renders correctly in email client

**Test 9.4: Verify Email Template**
- Check the received email:
  - ✓ Digital Agency branding visible
  - ✓ Welcome message personalized
  - ✓ Company details in footer
  - ✓ Links are clickable
  - ✓ Mobile responsive layout

---

## Known Test Data

### Client Credentials
- **Email**: `client@example.com`
- **Method**: Google Sign-In (use this email in Firebase console)

### Admin Credentials
- **URL**: `http://localhost:5173/admin`
- **Password**: `admin123`

### MongoDB Test Data
- **Portfolio Projects**: 6 projects
- **Clients**: 6 testimonials
- **Contacts**: 3 inquiries
- **Subscribers**: 5 entries
- **Client Projects**: 3 (assigned to client@example.com)
- **Messages**: 4 (from client@example.com)
- **Files**: 5 (from client@example.com)

---

## Troubleshooting

### Issue: Backend won't start
- **Solution**: 
  - Check if port 5000 is in use: `netstat -ano | findstr :5000`
  - Kill process: `taskkill /PID <PID> /F`
  - Try different port in .env

### Issue: Frontend won't start
- **Solution**:
  - Check if port 5173 is in use
  - Try port 5174: `npm run dev -- --port 5174`
  - Update frontend `.env` to use new port

### Issue: MongoDB connection fails
- **Solution**:
  - Check internet connection
  - Verify MongoDB URI in `.env`
  - Check MongoDB Atlas whitelist (add your IP)

### Issue: Google Sign-In not working
- **Solution**:
  - Verify Firebase project ID in frontend `.env`
  - Check Firebase console > Authentication > Google enabled
  - Add localhost to authorized domains

### Issue: Emails not sending
- **Solution**:
  - Verify Gmail credentials in `.env`
  - Enable "Less secure app access" (if using regular Gmail)
  - Check Gmail spam folder
  - Verify EMAIL_FROM is valid

---

## Summary

This checklist covers:
- ✅ Backend API verification
- ✅ Landing page functionality
- ✅ Client authentication
- ✅ Client dashboard features
- ✅ Messaging system
- ✅ File sharing
- ✅ Admin dashboard & analytics
- ✅ Email notifications
- ✅ Gmail SMTP configuration

**Total Tests**: 50+ test cases
**Estimated Time**: 45-60 minutes
