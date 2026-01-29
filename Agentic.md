# 🤖 Digital Agency - Agentic Development Workflow

## Overview
This document outlines an agent-based approach to building the Digital Agency Full Stack application. Each agent represents an autonomous unit responsible for specific tasks with clear inputs, outputs, and success criteria.

---

## 🎯 Project Architecture

### Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Storage**: Cloudinary (images)
- **Auth**: Firebase (Google Sign-in) + Custom Admin Password
- **Deployment**: Vercel (Frontend) + Render/Railway (Backend)

### Key Features
1. Public landing page with projects, testimonials, contact form
2. Admin panel for content management
3. Image cropping (450x350px) with preview
4. Newsletter subscription system
5. Contact form inquiries management

---

## 🤖 Agent Workflow Structure

### Agent 1: Infrastructure Setup Agent
**Responsibility**: Initialize project structure and dependencies

**Tasks**:
1. Create root directory structure
2. Initialize backend Node.js project
3. Initialize frontend React + Vite project
4. Setup version control (.gitignore)

**Inputs**: 
- Project name: "digital-agency"
- Tech stack requirements

**Outputs**:
- Complete directory structure
- `backend/package.json` with dependencies
- `frontend/package.json` with dependencies
- `.gitignore` configured

**Success Criteria**:
- Both frontend and backend can run `npm install` successfully
- Directory structure matches plan specification

**Dependencies**: None (First agent)

---

### Agent 2: Database & Configuration Agent
**Responsibility**: Setup database and environment configuration

**Tasks**:
1. Create MongoDB Atlas cluster
2. Setup Mongoose connection in `backend/config/database.js`
3. Create environment variable templates (`.env.example`)
4. Configure Cloudinary SDK

**Inputs**:
- MongoDB connection string
- Cloudinary API credentials
- Admin password for protected routes

**Outputs**:
- `backend/config/database.js` - MongoDB connection module
- `backend/.env.example` - Template with required vars
- Working database connection

**Success Criteria**:
- Successful connection to MongoDB Atlas
- Cloudinary SDK initialized and tested
- Health check endpoint returns 200

**Dependencies**: Agent 1 (Infrastructure Setup)

---

### Agent 3: Backend Models Agent
**Responsibility**: Define data schemas and validation

**Tasks**:
1. Create `backend/models/Project.js`
   - Fields: title (String, required), description (String), imageUrl (String, required)
2. Create `backend/models/Client.js`
   - Fields: name (String, required), designation (String), description (String), imageUrl (String, required)
3. Create `backend/models/Contact.js`
   - Fields: fullName (String, required), email (String, required, validated), mobileNumber (String, required), city (String), submittedAt (Date, default: now)
4. Create `backend/models/Subscription.js`
   - Fields: email (String, required, unique, validated), subscribedAt (Date, default: now)

**Inputs**:
- Schema requirements from plan
- Validation rules (email format, required fields)

**Outputs**:
- 4 Mongoose model files with validation
- Indexed fields for performance

**Success Criteria**:
- All models can be imported without errors
- Validation works (test invalid email/phone)
- Timestamps auto-generate

**Dependencies**: Agent 2 (Database setup)

---

### Agent 4: Backend Middleware Agent
**Responsibility**: Create reusable middleware functions

**Tasks**:
1. Create `backend/middleware/auth.js`
   - Check `x-admin-token` header
   - Compare against `process.env.ADMIN_PASSWORD`
   - Return 401 if invalid
2. Create `backend/middleware/errorHandler.js`
   - Centralized error handling
   - Log errors and return JSON responses
3. Configure CORS middleware
   - Allow frontend origin
   - Allow credentials

**Inputs**:
- Admin password from environment
- Frontend URL for CORS

**Outputs**:
- `backend/middleware/auth.js`
- `backend/middleware/errorHandler.js`
- Configured CORS settings

**Success Criteria**:
- Auth middleware blocks requests without valid token
- Error handler catches and formats errors properly
- CORS allows frontend requests

**Dependencies**: Agent 2 (Configuration)

---

### Agent 5: Image Processing Agent
**Responsibility**: Handle image uploads and optimization

**Tasks**:
1. Setup Multer for file upload handling
2. Create Sharp pipeline for image processing:
   - Validate image format
   - Resize to exactly 450x350px
   - Optimize quality
3. Create Cloudinary upload helper
4. Create Cloudinary delete helper (for updates)

**Inputs**:
- Image file (blob/buffer)
- Cloudinary credentials

**Outputs**:
- `backend/utils/imageUpload.js` - Upload helper
- `backend/utils/imageDelete.js` - Delete helper
- Processed image URL from Cloudinary

**Success Criteria**:
- Images uploaded successfully to Cloudinary
- All images resized to 450x350px
- Old images deleted when updating
- Handles errors (invalid format, upload failure)

**Dependencies**: Agent 2 (Cloudinary config)

---

### Agent 6: Backend Controllers Agent
**Responsibility**: Implement business logic for all endpoints

**Tasks**:
1. Create `backend/controllers/projectController.js`
   - `getAllProjects()` - Fetch all projects
   - `createProject()` - Create with image upload
   - `deleteProject()` - Delete project and image
2. Create `backend/controllers/clientController.js`
   - `getAllClients()` - Fetch all clients
   - `createClient()` - Create with image upload
   - `deleteClient()` - Delete client and image
3. Create `backend/controllers/contactController.js`
   - `submitContact()` - Save inquiry
   - `getAllContacts()` - Admin view
   - `deleteContact()` - Remove inquiry
4. Create `backend/controllers/subscriptionController.js`
   - `subscribe()` - Save email
   - `getAllSubscribers()` - Admin view
   - `deleteSubscriber()` - Remove subscriber

**Inputs**:
- Request data (body, params)
- Database models
- Image processing utilities

**Outputs**:
- 4 controller files with full CRUD operations
- Proper error handling in each function
- Success/error response formatting

**Success Criteria**:
- All controller functions work as expected
- Proper validation before DB operations
- Images uploaded via Cloudinary
- Error messages are descriptive

**Dependencies**: Agent 3 (Models), Agent 5 (Image processing)

---

### Agent 7: Backend Routes Agent
**Responsibility**: Define API endpoints and wire to controllers

**Tasks**:
1. Create `backend/routes/projects.js`
   - `GET /api/v1/projects` (public)
   - `POST /api/v1/projects` (admin, with multer)
   - `DELETE /api/v1/projects/:id` (admin)
2. Create `backend/routes/clients.js`
   - `GET /api/v1/clients` (public)
   - `POST /api/v1/clients` (admin, with multer)
   - `DELETE /api/v1/clients/:id` (admin)
3. Create `backend/routes/contact.js`
   - `POST /api/v1/contact` (public)
   - `GET /api/v1/contact` (admin)
   - `DELETE /api/v1/contact/:id` (admin)
4. Create `backend/routes/subscription.js`
   - `POST /api/v1/subscribe` (public)
   - `GET /api/v1/subscribe` (admin)
   - `DELETE /api/v1/subscribe/:id` (admin)

**Inputs**:
- Controller functions
- Auth middleware
- Multer configuration

**Outputs**:
- 4 route files with all endpoints
- Proper middleware applied (auth, multer)
- RESTful route structure

**Success Criteria**:
- All routes respond correctly
- Admin routes protected by auth middleware
- File upload routes use multer
- Routes mounted on `/api/v1`

**Dependencies**: Agent 4 (Middleware), Agent 6 (Controllers)

---

### Agent 8: Backend Server Agent
**Responsibility**: Create main Express server

**Tasks**:
1. Create `backend/server.js`
2. Configure middleware stack:
   - Body parser (JSON, urlencoded)
   - CORS
   - Routes
   - Error handler
3. Connect to database
4. Start server on port 5000
5. Add health check endpoint

**Inputs**:
- All route modules
- Database connection
- Environment variables

**Outputs**:
- `backend/server.js` - Main server file
- Running server on `localhost:5000`

**Success Criteria**:
- Server starts without errors
- Health check returns 200
- All routes accessible
- Database connection established

**Dependencies**: Agent 2 (Database), Agent 7 (Routes)

---

### Agent 9: Frontend Configuration Agent
**Responsibility**: Setup React app and tooling

**Tasks**:
1. Configure Tailwind CSS (`tailwind.config.js`)
2. Setup Firebase config (`frontend/src/utils/firebaseConfig.js`)
3. Create Axios instance (`frontend/src/services/api.js`)
   - Base URL configuration
   - Request/response interceptors
   - Admin token injection
4. Setup React Router
5. Configure Vite (`vite.config.js`)

**Inputs**:
- Firebase credentials
- Backend API URL
- Tailwind theme preferences

**Outputs**:
- `frontend/tailwind.config.js`
- `frontend/src/utils/firebaseConfig.js`
- `frontend/src/services/api.js` - API service layer
- `frontend/vite.config.js`

**Success Criteria**:
- Tailwind classes work in components
- Firebase SDK initialized
- Axios can make requests to backend
- Vite dev server runs successfully

**Dependencies**: Agent 1 (Frontend setup), Agent 8 (Backend running)

---

### Agent 10: Frontend API Service Agent
**Responsibility**: Create API integration layer

**Tasks**:
1. Extend `frontend/src/services/api.js` with functions:
   - `fetchProjects()` - GET /api/v1/projects
   - `fetchClients()` - GET /api/v1/clients
   - `submitContact(data)` - POST /api/v1/contact
   - `subscribe(email)` - POST /api/v1/subscribe
   - `createProject(formData)` - POST /api/v1/projects (admin)
   - `deleteProject(id)` - DELETE /api/v1/projects/:id (admin)
   - `createClient(formData)` - POST /api/v1/clients (admin)
   - `deleteClient(id)` - DELETE /api/v1/clients/:id (admin)
   - `fetchContacts()` - GET /api/v1/contact (admin)
   - `deleteContact(id)` - DELETE /api/v1/contact/:id (admin)
   - `fetchSubscribers()` - GET /api/v1/subscribe (admin)
   - `deleteSubscriber(id)` - DELETE /api/v1/subscribe/:id (admin)

**Inputs**:
- Backend API endpoints
- Request/response structure

**Outputs**:
- Complete API service layer
- Error handling for all requests
- Loading state management

**Success Criteria**:
- All API functions work correctly
- Errors caught and formatted
- Admin token sent when required
- FormData used for file uploads

**Dependencies**: Agent 9 (Axios setup), Agent 8 (Backend API)

---

### Agent 11: Frontend Auth Agent
**Responsibility**: Implement authentication system

**Tasks**:
1. Create Firebase Google Sign-in flow
2. Create auth context/hook for user state
3. Create `frontend/src/components/auth/ProtectedRoute.jsx`
   - Check admin authentication
   - Redirect if not authenticated
4. Implement admin password prompt
5. Store admin token in localStorage

**Inputs**:
- Firebase configuration
- Admin password logic

**Outputs**:
- `frontend/src/contexts/AuthContext.jsx` or similar
- `frontend/src/components/auth/ProtectedRoute.jsx`
- Login/logout functionality

**Success Criteria**:
- Users can sign in with Google
- Admin routes protected by password
- Token persists in localStorage
- Logout clears authentication

**Dependencies**: Agent 9 (Firebase config)

---

### Agent 12: Landing Page UI Agent
**Responsibility**: Build public-facing landing page

**Tasks**:
1. Create `frontend/src/components/landing/Navbar.jsx`
   - Logo, navigation links, Sign-In button
2. Create `frontend/src/components/landing/HeroSection.jsx`
   - Hero banner with CTA
3. Create `frontend/src/components/landing/ProjectsSection.jsx`
   - Grid layout (3 columns)
   - Project cards with image, title, description
4. Create `frontend/src/components/landing/TestimonialsSection.jsx`
   - Client testimonial cards
5. Create `frontend/src/components/landing/ContactForm.jsx`
   - Form inputs: fullName, email, mobile, city
   - Submit button with loading state
6. Create `frontend/src/components/landing/Footer.jsx`
   - Newsletter subscription input
   - Links and social media
7. Create `frontend/src/pages/LandingPage.jsx`
   - Compose all sections

**Inputs**:
- Design mockups/wireframes
- Content requirements
- Tailwind configuration

**Outputs**:
- 7 React component files
- Fully responsive landing page
- Connected to API service

**Success Criteria**:
- All sections render correctly
- Forms submit successfully
- Projects and testimonials load from API
- Responsive on mobile/tablet/desktop
- Loading states and error messages

**Dependencies**: Agent 9 (Tailwind), Agent 10 (API service)

---

### Agent 13: Image Cropper Agent
**Responsibility**: Implement image cropping functionality

**Tasks**:
1. Create `frontend/src/components/admin/ImageCropper.jsx`
   - Use `react-image-crop` library
   - Lock aspect ratio to 450:350
   - Display live preview
   - Confirm/Cancel buttons
2. Implement crop-to-blob conversion
3. Create modal wrapper for cropper

**Inputs**:
- Selected image file
- Aspect ratio (450:350)

**Outputs**:
- `frontend/src/components/admin/ImageCropper.jsx`
- Cropped image blob for upload

**Success Criteria**:
- Image displays in crop area
- Aspect ratio locked correctly
- Cropped blob generated on confirm
- Preview updates in real-time
- Cancel discards changes

**Dependencies**: Agent 9 (React setup)

---

### Agent 14: Admin Panel UI Agent
**Responsibility**: Build admin dashboard and forms

**Tasks**:
1. Create `frontend/src/components/admin/Sidebar.jsx`
   - Navigation: Projects, Clients, Inquiries, Subscribers
2. Create `frontend/src/components/admin/ProjectForm.jsx`
   - Inputs: title, description, image
   - Integrate ImageCropper
   - Submit creates project
3. Create `frontend/src/components/admin/ClientForm.jsx`
   - Inputs: name, designation, description, image
   - Integrate ImageCropper
4. Create `frontend/src/components/admin/InquiriesTable.jsx`
   - Display all contact submissions
   - Delete button for each row
5. Create `frontend/src/components/admin/SubscribersList.jsx`
   - Display all subscribers
   - Delete button for each row
6. Create `frontend/src/components/admin/AdminDashboard.jsx`
   - Layout with sidebar and content area
7. Create `frontend/src/pages/AdminPage.jsx`
   - Protected route wrapper

**Inputs**:
- ImageCropper component
- API service functions
- Auth protection

**Outputs**:
- 7 React component files
- Full admin panel functionality

**Success Criteria**:
- Forms submit with cropped images
- Tables display data from API
- Delete operations work
- Protected by authentication
- Responsive layout

**Dependencies**: Agent 10 (API), Agent 11 (Auth), Agent 13 (Image Cropper)

---

### Agent 15: Common Components Agent
**Responsibility**: Build reusable UI components

**Tasks**:
1. Create `frontend/src/components/common/LoadingSpinner.jsx`
   - Animated spinner component
2. Setup `react-hot-toast` for notifications
3. Create error boundary component (optional)
4. Create button component with variants (optional)

**Inputs**:
- Design system requirements
- Tailwind theme

**Outputs**:
- Reusable component library
- Toast notification system configured

**Success Criteria**:
- Loading spinner used throughout app
- Toasts show on form submissions
- Consistent styling across components

**Dependencies**: Agent 9 (Tailwind)

---

### Agent 16: Testing Agent
**Responsibility**: Test all functionality end-to-end

**Tasks**:
1. **API Testing**:
   - Test all endpoints with Postman/Thunder Client
   - Verify error responses
   - Test admin authentication
   - Test file uploads
2. **Frontend Testing**:
   - Test form submissions
   - Test image cropping workflow
   - Test admin CRUD operations
   - Test responsive design
3. **Integration Testing**:
   - Test complete user flows
   - Verify data persistence
   - Test error scenarios

**Inputs**:
- Completed frontend and backend
- Test scenarios from requirements

**Outputs**:
- Test report with findings
- Bug list with severity
- Screenshots of issues

**Success Criteria**:
- All endpoints return correct data
- Forms submit successfully
- Images upload and display correctly
- No console errors
- Responsive on all screen sizes

**Dependencies**: All previous agents

---

### Agent 17: Deployment Agent
**Responsibility**: Deploy application to production

**Tasks**:
1. **Backend Deployment (Render/Railway)**:
   - Create `backend/render.yaml`
   - Setup environment variables
   - Deploy backend
   - Test deployed API endpoints
2. **Frontend Deployment (Vercel)**:
   - Create `frontend/vercel.json`
   - Configure environment variables (API URL)
   - Deploy frontend
   - Test deployed app
3. **Post-Deployment**:
   - Update CORS settings
   - Test all features in production
   - Monitor logs for errors

**Inputs**:
- Deployment platform credentials
- Environment variables
- Production URLs

**Outputs**:
- `backend/render.yaml`
- `frontend/vercel.json`
- Live URLs for frontend and backend

**Success Criteria**:
- Backend API accessible via HTTPS
- Frontend loads without errors
- All API calls work from production frontend
- Images upload successfully
- Forms submit correctly

**Dependencies**: Agent 16 (Testing passed)

---

## 📊 Agent Dependency Graph

```
Agent 1 (Infrastructure)
  ├─→ Agent 2 (Database & Config)
  │     ├─→ Agent 3 (Models)
  │     │     └─→ Agent 6 (Controllers)
  │     ├─→ Agent 4 (Middleware)
  │     │     └─→ Agent 7 (Routes)
  │     └─→ Agent 5 (Image Processing)
  │           └─→ Agent 6 (Controllers)
  │
  ├─→ Agent 9 (Frontend Config)
        ├─→ Agent 10 (API Service)
        ├─→ Agent 11 (Auth)
        ├─→ Agent 13 (Image Cropper)
        └─→ Agent 15 (Common Components)

Agent 6 + Agent 7 → Agent 8 (Backend Server)

Agent 10 + Agent 11 + Agent 15 → Agent 12 (Landing Page)

Agent 10 + Agent 11 + Agent 13 + Agent 15 → Agent 14 (Admin Panel)

Agent 8 + Agent 12 + Agent 14 → Agent 16 (Testing)

Agent 16 → Agent 17 (Deployment)
```

---

## 🚀 Execution Strategy

### Parallel Execution Opportunities
- **Wave 1**: Agent 1 (solo)
- **Wave 2**: Agent 2, Agent 9 (parallel - backend & frontend config)
- **Wave 3**: Agent 3, Agent 4, Agent 5, Agent 15 (parallel - independent modules)
- **Wave 4**: Agent 6, Agent 11, Agent 13 (parallel - depends on Wave 3)
- **Wave 5**: Agent 7, Agent 10 (parallel - routing and API)
- **Wave 6**: Agent 8, Agent 12 (parallel - server and landing page)
- **Wave 7**: Agent 14 (depends on Wave 6)
- **Wave 8**: Agent 16 (testing - depends on all)
- **Wave 9**: Agent 17 (deployment - final step)

### Sequential Constraints
- Must complete Wave N before starting Wave N+1
- Agent 16 requires all other agents to complete
- Agent 17 requires successful testing

---

## 📝 Agent Communication Protocol

Each agent must:
1. **Input Validation**: Verify all inputs before starting
2. **Output Documentation**: Document all outputs with examples
3. **Error Reporting**: Report errors with context and suggestions
4. **Status Updates**: Provide progress updates (25%, 50%, 75%, 100%)
5. **Handoff**: Explicitly confirm completion and pass outputs to dependent agents

---

## 🔧 Environment Variables Reference

**Backend `.env`**:
```
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_PASSWORD=your_secure_password
PORT=5000
NODE_ENV=production
```

**Frontend `.env`**:
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## ✅ Final Deliverables Checklist

- [ ] Backend API deployed and functional
- [ ] Frontend deployed and accessible
- [ ] All CRUD operations work
- [ ] Image upload and cropping functional
- [ ] Forms submit successfully
- [ ] Admin authentication works
- [ ] Responsive design verified
- [ ] No console errors
- [ ] API error handling tested
- [ ] Documentation complete

---

## 🎯 Success Metrics

1. **Performance**: Landing page loads < 3 seconds
2. **Image Quality**: All images exactly 450x350px
3. **Uptime**: Backend API 99%+ availability
4. **Error Rate**: < 1% failed requests
5. **Mobile Responsive**: All features work on mobile devices
6. **Security**: Admin routes properly protected

---

*This agentic workflow enables parallel development, clear handoffs, and modular testing. Each agent can work independently within its defined scope while maintaining integration points with dependent agents.*