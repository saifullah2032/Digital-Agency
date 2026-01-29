# Testing & Integration Guide

## Prerequisites

Before testing, ensure you have:

1. **External Services Configured:**
   - MongoDB Atlas cluster with connection string
   - Cloudinary account with API credentials
   - Firebase project with Google Sign-in enabled (optional)
   - All `.env` files properly configured in both frontend and backend

2. **Dependencies Installed:**
   - Backend: `npm install` in `/backend`
   - Frontend: `npm install` in `/frontend`

---

## Phase 3A: Backend Testing

### Step 1: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║     Digital Agency Backend Server Running                 ║
║     Server: http://localhost:5000                        ║
║     Environment: development                             ║
╚════════════════════════════════════════════════════════════╝
```

### Step 2: Test Health Check Endpoint

Open Postman or ThunderClient and test:

**GET** `http://localhost:5000/api/v1/health`

Expected Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-29T10:15:00.000Z"
}
```

### Step 3: Test API Endpoints

#### Test GET Projects (Public)
```
GET http://localhost:5000/api/v1/projects
```
Expected: `200 OK` with empty array initially

#### Test POST Project (Admin)
```
POST http://localhost:5000/api/v1/projects
Headers: x-admin-token: admin123
Body (form-data):
  - title: "Sample Project"
  - description: "Test description"
  - image: (select any image file)
```

#### Test GET Clients (Public)
```
GET http://localhost:5000/api/v1/clients
```

#### Test POST Client (Admin)
```
POST http://localhost:5000/api/v1/clients
Headers: x-admin-token: admin123
Body (form-data):
  - name: "John Doe"
  - designation: "CEO"
  - description: "Great experience!"
  - image: (select any image file)
```

#### Test POST Contact (Public)
```
POST http://localhost:5000/api/v1/contact
Body (JSON):
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "mobileNumber": "1234567890",
  "city": "New York"
}
```

#### Test POST Subscribe (Public)
```
POST http://localhost:5000/api/v1/subscribe
Body (JSON):
{
  "email": "user@example.com"
}
```

#### Test GET Contact (Admin)
```
GET http://localhost:5000/api/v1/contact
Headers: x-admin-token: admin123
```

#### Test GET Subscribers (Admin)
```
GET http://localhost:5000/api/v1/subscribe
Headers: x-admin-token: admin123
```

### Step 4: Verify MongoDB Connection

Check MongoDB Atlas:
1. Go to MongoDB Atlas Dashboard
2. Click on your cluster
3. Browse Collections
4. Verify `projects`, `clients`, `contacts`, `subscriptions` collections exist
5. Verify documents are stored

---

## Phase 3B: Frontend Testing

### Step 1: Start Frontend Server

```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 2: Test Landing Page

1. **Open browser:** `http://localhost:5173`

2. **Test Navbar:**
   - Click "Home" → Should scroll to hero
   - Click "Projects" → Should scroll to projects section
   - Click "Testimonials" → Should scroll to testimonials
   - Click "Contact" → Should scroll to contact form
   - Click "Admin" → Should redirect to admin panel

3. **Test Hero Section:**
   - "View Our Projects" button → Should scroll to projects
   - "Get In Touch" button → Should scroll to contact form

4. **Test Projects Section:**
   - Should load projects from backend
   - Images should display (450x350px)
   - Hover effect should work
   - If no projects, should show "No projects available yet"

5. **Test Testimonials Section:**
   - Should load clients from backend
   - Star ratings should display
   - Images should show in circles
   - If no clients, should show "No testimonials available yet"

6. **Test Contact Form:**
   - Fill all fields (Full Name, Email, Mobile, City)
   - Click "Send Message"
   - Should show success toast: "Message sent successfully!"
   - Form should clear
   - Check MongoDB Atlas → contacts collection should have new entry

7. **Test Newsletter Footer:**
   - Enter email in footer
   - Click "Join"
   - Should show success toast: "Successfully subscribed to our newsletter!"
   - Check MongoDB Atlas → subscriptions collection should have new entry

### Step 3: Test Admin Panel Access

1. **Go to:** `http://localhost:5173/admin`

2. **Password Prompt:**
   - Enter `admin123`
   - Click "Login"
   - Should show admin dashboard

3. **Test Projects Tab:**
   - Click "Projects" tab
   - Click "Add New Project" button
   - Fill title and description
   - Click image area
   - Image Cropper modal should open
   - Select image from computer
   - Crop to desired area (450x350 ratio locked)
   - Click "Confirm Crop"
   - Modal closes, image marked as selected
   - Click "Add Project"
   - Should show success: "Project added successfully"
   - Go to landing page → New project should appear in Projects section

4. **Test Clients Tab:**
   - Click "Clients" tab
   - Click "Add New Client" button
   - Fill name, designation, testimonial
   - Select and crop image
   - Click "Add Client"
   - Should show success
   - Go to landing page → New client should appear in Testimonials section

5. **Test Inquiries Tab:**
   - Should show table of all contact submissions
   - Each row shows: Name, Email, Mobile, City, Date
   - Delete button should remove inquiry from list
   - Submit new contact from landing page → Should appear in inquiries

6. **Test Subscribers Tab:**
   - Should show list of all newsletter subscribers
   - Each row shows: Email, Subscribed Date
   - Remove button should unsubscribe
   - Subscribe from landing page → Should appear in subscribers

### Step 4: Test Image Cropper

1. **Open admin panel → Projects tab**
2. **Click image area → Cropper modal opens**
3. **Verify:**
   - Image displays in cropper
   - Aspect ratio lock (450:350) works
   - Can drag crop area
   - Preview updates
   - "Confirm Crop" button → Image selected
   - "Change image" button → Can select different image

---

## Phase 3C: End-to-End Flow Testing

### Complete User Journey (Landing Page)

1. User lands on website
2. Reads hero section content
3. Scrolls through projects
4. Reads testimonials
5. Fills contact form with details
6. Gets success notification
7. Subscribes to newsletter
8. Submission appears in admin panel

### Complete Admin Journey (Admin Panel)

1. Admin navigates to `/admin`
2. Enters password `admin123`
3. Adds projects with images
4. Adds client testimonials with images
5. Views all contact inquiries
6. Views all newsletter subscribers
7. Can delete any item
8. Logs out

---

## Common Issues & Solutions

### Issue: Image not uploading to Cloudinary

**Solution:**
- Verify Cloudinary credentials in `.env`
- Check Cloudinary account has API access enabled
- Ensure file is valid image format
- Check Cloudinary free tier limit (25/month)

### Issue: MongoDB connection fails

**Solution:**
- Verify `MONGODB_URI` in `.env`
- Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0 for dev)
- Verify username and password are correct
- Ensure database name is correct

### Issue: Admin authentication fails

**Solution:**
- Verify `x-admin-token` header matches `ADMIN_PASSWORD`
- Default password is `admin123`
- Check localStorage for token (browser dev tools → Application → localStorage)

### Issue: Image cropping not working

**Solution:**
- Ensure `react-image-crop` CSS is imported
- Check browser console for errors
- Verify image file is valid
- Clear browser cache and reload

---

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Health check endpoint returns 200
- [ ] MongoDB connection successful
- [ ] Cloudinary image uploads working
- [ ] Frontend server starts without errors
- [ ] Landing page loads completely
- [ ] Projects display with images
- [ ] Testimonials display with images
- [ ] Contact form submits successfully
- [ ] Newsletter subscription works
- [ ] Admin panel password authentication works
- [ ] Add project form works with image cropper
- [ ] Add client form works with image cropper
- [ ] Inquiries table displays data
- [ ] Subscribers table displays data
- [ ] Delete functionality works
- [ ] All form validations working
- [ ] Toast notifications displaying
- [ ] Responsive design works on mobile
- [ ] Images are 450x350px after cropping

---

## Next Steps

Once testing is complete and all items are checked:

1. Commit changes to git: `git add . && git commit -m "Complete Digital Agency implementation"`
2. Move to Phase 4: Deployment
3. Deploy backend to Render or Railway
4. Deploy frontend to Vercel
5. Update environment variables on deployment platforms
6. Test deployed application

---

## Browser DevTools Tips

1. **Network Tab:** Monitor API requests
2. **Console Tab:** View error logs
3. **Application Tab:** Check localStorage for admin token
4. **Storage Tab:** View IndexedDB if using Firebase
