# Digital Agency Full Stack Application

A professional landing page and secure admin panel for a digital agency with dynamic content management.

## Features

- **Public Landing Page**
  - Responsive hero section with call-to-action
  - Dynamic projects showcase with images
  - Client testimonials section
  - Contact form with validation
  - Newsletter subscription

- **Admin Panel**
  - Secure authentication with hardcoded admin password
  - Project management (CRUD operations)
  - Client testimonials management
  - Contact inquiries view
  - Newsletter subscribers view
  - **Bonus:** Image cropping tool with 450x350px aspect ratio

- **Authentication**
  - Admin panel: Simple password authentication
  - Landing page: Google Sign-in via Firebase (optional)

## Tech Stack

**Frontend:** React.js (Vite) + Tailwind CSS + React Router  
**Backend:** Node.js + Express.js  
**Database:** MongoDB Atlas  
**Image Storage:** Cloudinary  
**Auth:** Firebase (Google Sign-in)  
**Deployment:** Render (Frontend) + Render (Backend)

## Quick Start

### Prerequisites
- Node.js 14+ and npm/yarn
- Git
- Cloudinary account (free tier)
- MongoDB Atlas account (free tier)
- Firebase project

### Setup Instructions

1. **Clone and Setup External Services**
   ```bash
   # Read the setup guide for external services
   cat SETUP_GUIDE.md
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with variables from SETUP_GUIDE.md
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env file with variables from SETUP_GUIDE.md
   npm run dev
   ```

## Project Structure

```
digital-agency/
├── frontend/              # React + Vite application
├── backend/               # Express API server
├── plan.md               # Development plan
├── SETUP_GUIDE.md        # External services setup
└── README.md             # This file
```

## API Endpoints

Base URL: `/api/v1`

**Public:**
- `GET /projects` - Fetch all projects
- `GET /clients` - Fetch all testimonials
- `POST /contact` - Submit contact form
- `POST /subscribe` - Subscribe to newsletter

**Admin (requires password):**
- `POST /projects` - Create project
- `DELETE /projects/:id` - Delete project
- `POST /clients` - Create client
- `DELETE /clients/:id` - Delete client
- `GET /contact` - View submissions
- `DELETE /contact/:id` - Delete submission
- `GET /subscribe` - View subscribers
- `DELETE /subscribe/:id` - Unsubscribe

## Development

See `plan.md` for detailed phase-by-phase development plan.

## Deployment

### Frontend (Render)
- Connect GitHub repository
- Set environment variables
- Deploy automatically

### Backend (Render/Railway)
- Create account and new service
- Set environment variables
- Deploy from GitHub

## Admin Panel Access

- URL: `/admin`
- Password: `admin123`

## Notes

- Do not use the word "Flipr" anywhere in the codebase
- Free tier limitations:
  - Cloudinary: 25 monthly transformations
  - MongoDB Atlas: 512MB storage
  - Render: Generous free tier for static sites
  - Render: Sleep mode on free tier

## Support

For issues or questions, refer to the `plan.md` file or individual component documentation.

---

**Created for Digital Agency Full Stack Project**

**DEMO of Project**

**LINK:-** https://digital-agency-it8m.onrender.com/
