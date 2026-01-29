# 📋 Digital Agency Full Stack - Complete Execution Plan

## **Phase 1: Project Initialization & Setup**

### Directory Structure
```
digital-agency/
├── frontend/                    # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── ProjectsSection.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   ├── ContactForm.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── ProjectForm.jsx
│   │   │   │   ├── ClientForm.jsx
│   │   │   │   ├── ImageCropper.jsx
│   │   │   │   ├── InquiriesTable.jsx
│   │   │   │   └── SubscribersList.jsx
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── common/
│   │   │       └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   └── AdminPage.jsx
│   │   ├── services/
│   │   │   └── api.js            # Axios instance + API calls
│   │   ├── utils/
│   │   │   └── firebaseConfig.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json               # Deployment config
│   └── package.json
│
├── backend/                      # Node.js + Express
│   ├── models/
│   │   ├── Project.js
│   │   ├── Client.js
│   │   ├── Contact.js
│   │   └── Subscription.js
│   ├── routes/
│   │   ├── projects.js
│   │   ├── clients.js
│   │   ├── contact.js
│   │   └── subscription.js
│   ├── middleware/
│   │   ├── auth.js               # Admin password verification
│   │   └── errorHandler.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── clientController.js
│   │   ├── contactController.js
│   │   └── subscriptionController.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   ├── .env                      # Environment variables (not committed)
│   ├── .env.example              # Template for env vars
│   ├── package.json
│   └── render.yaml               # Deployment config

└── .gitignore
```

---

## **Phase 2: Development Breakdown**

### **Phase 2A: Backend Setup** (Complexity: Easy → Medium)

**Task 1: Initialize Node.js Project**
- Create `backend/package.json` with dependencies:
  - `express`, `mongoose`, `dotenv`, `multer`, `sharp`, `cors`, `cloudinary`
- Install all packages
- Create `.env` template with: `MONGODB_URI`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`, `ADMIN_PASSWORD`

**Task 2: Setup MongoDB Connection**
- Create `backend/config/database.js`
- Initialize Mongoose connection to MongoDB Atlas
- Test connection with a simple health-check endpoint

**Task 3: Create Mongoose Models**
- **Project.js**: `title`, `description`, `imageUrl`
- **Client.js**: `name`, `designation`, `description`, `imageUrl`
- **Contact.js**: `fullName`, `email`, `mobileNumber`, `city`, `submittedAt`
- **Subscription.js**: `email`, `subscribedAt`
- Add validation for email and phone fields

**Task 4: Setup Cloudinary Integration**
- Configure Cloudinary SDK in backend
- Create helper function to upload files to Cloudinary and return URL
- Create helper function to delete old images from Cloudinary when updating

**Task 5: Implement Middleware**
- **Auth Middleware**: Check `x-admin-token` header against hardcoded password
- **Error Handler**: Centralized error handling
- **CORS**: Configure for frontend origin

**Task 6: Create Backend Routes & Controllers**
- **Projects**: 
  - `GET /api/v1/projects` (public) → fetch all
  - `POST /api/v1/projects` (admin) → create with image upload
- **Clients**:
  - `GET /api/v1/clients` (public) → fetch all
  - `POST /api/v1/clients` (admin) → create with image upload
- **Contact**:
  - `POST /api/v1/contact` (public) → save submission
  - `GET /api/v1/contact` (admin) → view all
- **Subscription**:
  - `POST /api/v1/subscribe` (public) → save email
  - `GET /api/v1/subscribe` (admin) → view all

**Task 7: Setup Express Server**
- Create `backend/server.js`
- Configure middleware stack (CORS, body parser, routes)
- Add error handling
- Start server on port 5000

---

### **Phase 2B: Frontend Setup** (Complexity: Easy)

**Task 1: Initialize React + Vite**
- Create React app with Vite
- Install dependencies:
  - `react-router-dom`, `axios`, `tailwindcss`, `lucide-react`, `react-image-crop`, `firebase`, `react-hot-toast` (for notifications)
- Configure Tailwind CSS

**Task 2: Setup Firebase Authentication**
- Create Firebase project
- Enable Google Sign-in
- Create `frontend/src/utils/firebaseConfig.js` with Firebase config
- Create authentication context/hook for managing user login state

**Task 3: Create API Service Layer**
- Create `frontend/src/services/api.js`
- Setup Axios instance with base URL
- Create functions for:
  - Fetching projects
  - Fetching clients
  - Submitting contact form
  - Subscribing to newsletter
  - Uploading project/client with image
  - Fetching contact submissions (admin)
  - Fetching subscribers (admin)

---

### **Phase 2C: Landing Page UI** (Complexity: Easy → Medium)

**Task 1: Create Layout Components**
- **Navbar**: Logo, Links (Home, Services, Projects, Testimonials, Contact), Sign-In button
- **Footer**: Newsletter subscription + links

**Task 2: Build Static Sections**
- **Hero Section**: Professional banner with CTA button
- **"Our Projects" Section**: Grid layout (3 columns) with project cards
- **"Happy Clients" Section**: Testimonial cards with avatar, name, designation, quote
- **Contact Form Section**: Inputs for full name, email, mobile, city with submit button
- **Newsletter Subscription**: Email input in footer

**Task 3: Wire Up API Calls**
- `useEffect` to fetch projects and clients on page load
- Form submissions to POST contact and subscribe endpoints
- Add loading states and error handling
- Toast notifications for form submission feedback

---

### **Phase 2D: Image Cropping Feature** (Complexity: Medium → High) ⚠️ Complex

**Task 1: Create Image Cropper Component**
- Implement `frontend/src/components/admin/ImageCropper.jsx`
- Use `react-image-crop` library
- Features:
  - Display selected image in crop container
  - Lock aspect ratio (450:350 for projects/clients)
  - Show live preview
  - Confirm/Cancel buttons

**Task 2: Integrate Cropper into Forms**
- Add file input in Project/Client forms
- Open modal with cropper when image selected
- Convert cropped image to blob
- Pass blob to upload function

**Task 3: Backend Image Processing**
- Receive cropped blob from frontend
- Use Multer to receive file
- Use Sharp to validate & resize to exactly 450x350px
- Upload to Cloudinary
- Return image URL to frontend

---

### **Phase 2E: Admin Panel** (Complexity: Medium)

**Task 1: Create Admin Layout**
- Dashboard with sidebar navigation
- Sections: Projects, Clients, Inquiries, Subscribers
- Protected routes (require admin password)

**Task 2: Implement CRUD Forms**
- **Add Project Form**: Title, Description, Image (with cropper)
- **Add Client Form**: Name, Designation, Description, Image (with cropper)

**Task 3: View Data Tables**
- **Inquiries Table**: Full Name, Email, Mobile, City, Submitted Date
- **Subscribers List**: Email, Subscribed Date
- Add delete functionality (for admins)

**Task 4: Admin Authentication**
- Simple password prompt when accessing `/admin`
- Store password hash (or use token) in localStorage
- Protect routes with `ProtectedRoute` component

---

## **Phase 3: Testing & Integration** (Complexity: Easy)

**Task 1: End-to-End Testing**
- Test form submissions on landing page
- Verify data appears in admin panel
- Test image upload & cropping workflow
- Test Cloudinary integration

**Task 2: API Testing**
- Test all endpoints with Postman/ThunderClient
- Verify error handling

**Task 3: UI/UX Polish**
- Responsive design for mobile/tablet
- Loading spinners
- Error messages
- Success notifications

---

## **Phase 4: Deployment** (Complexity: Medium)

**Task 1: Backend Deployment (Render/Railway)**
- Create `render.yaml` configuration
- Set environment variables on Render/Railway
- Deploy and test endpoints

**Task 2: Frontend Deployment (Vercel)**
- Create `vercel.json` configuration
- Set environment variables for API base URL
- Deploy and test

**Task 3: Post-Deployment Verification**
- Test all API calls from deployed frontend
- Verify image uploads work
- Test form submissions

---

## **Technology Stack Details**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + Vite | Modern SPA development |
| | Tailwind CSS | Styling |
| | React Router | Routing |
| | Axios | HTTP client |
| | react-image-crop | Image cropping UI |
| | Firebase Auth | Google Sign-in |
| | Lucide React | Icons |
| **Backend** | Node.js + Express | API server |
| | Mongoose | MongoDB ODM |
| | Multer | File upload handling |
| | Sharp | Image processing (resize/crop) |
| | Cloudinary SDK | Image storage & delivery |
| **Database** | MongoDB Atlas | Cloud NoSQL database |
| **Deployment** | Vercel | Frontend hosting |
| | Render/Railway | Backend hosting |

---

## **API Endpoint Summary**

```
BASE URL: /api/v1

PUBLIC ENDPOINTS:
  GET  /projects           - Fetch all projects
  POST /subscribe          - Subscribe to newsletter
  POST /contact            - Submit contact form
  GET  /clients            - Fetch all testimonials

ADMIN ENDPOINTS (requires x-admin-token header):
  POST   /projects         - Create new project (with image)
  DELETE /projects/:id     - Delete project
  POST   /clients          - Create new client (with image)
  DELETE /clients/:id      - Delete client
  GET    /contact          - View all contact submissions
  DELETE /contact/:id      - Delete contact submission
  GET    /subscribe        - View all subscribers
  DELETE /subscribe/:id    - Unsubscribe user
```

---

## **Key Implementation Notes**

1. **Admin Authentication**: Simple hardcoded password (e.g., `admin123`) verified via middleware
2. **Google Firebase Auth**: Used for landing page user context (optional, non-blocking)
3. **Image Cropping**: Must maintain 450x350px aspect ratio for consistency
4. **Cloudinary Free Tier**: Allows up to 25 monthly transformations; backup plan needed for high-volume use
5. **MongoDB Atlas**: Free tier covers small projects; upgrade if needed
6. **Deployment**: Both frontend and backend must be deployed for production use

---

## **Dependencies Summary**

**Frontend `package.json`:**
```
react, react-dom, react-router-dom, axios, tailwindcss, lucide-react, 
react-image-crop, firebase, react-hot-toast, vite
```

**Backend `package.json`:**
```
express, mongoose, dotenv, multer, sharp, cors, cloudinary, 
body-parser, helmet (optional for security)
```
