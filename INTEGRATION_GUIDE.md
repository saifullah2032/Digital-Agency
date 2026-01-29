# 🔌 Quick Integration Guide - New Features

## 1. Add Dark Mode to Navbar

**File**: `frontend/src/components/landing/Navbar.jsx`

```jsx
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Moon, Sun } from 'lucide-react';

// Add this inside your Navbar component
const { isDarkMode, toggleDarkMode } = useDarkMode();

// Add this button to your navbar (before or after login buttons)
<button
  onClick={toggleDarkMode}
  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
  title="Toggle Dark Mode"
>
  {isDarkMode ? (
    <Sun className="w-5 h-5 text-yellow-500" />
  ) : (
    <Moon className="w-5 h-5 text-gray-700" />
  )}
</button>
```

## 2. Add DarkModeProvider to App

**File**: `frontend/src/App.jsx` or `frontend/src/main.jsx`

```jsx
import { DarkModeProvider } from './contexts/DarkModeContext';

// Wrap your entire app
<DarkModeProvider>
  <BrowserRouter>
    {/* Your routes here */}
  </BrowserRouter>
</DarkModeProvider>
```

## 3. Add Activity Timeline Tab to Client Dashboard

**File**: `frontend/src/pages/ClientDashboard.jsx`

```jsx
import ActivityTimeline from '../components/client/ActivityTimeline';
import { useAuth } from '../contexts/AuthContext';

// In your component, add a new tab
const [activeTab, setActiveTab] = useState('projects'); // Add 'activities'

// In your tab buttons section
<button
  onClick={() => setActiveTab('activities')}
  className={`px-4 py-2 font-medium ${activeTab === 'activities' ? 'border-b-2 border-blue-500' : ''}`}
>
  Activities
</button>

// In your tab content section
{activeTab === 'activities' && (
  <ActivityTimeline clientEmail={user.email} />
)}
```

## 4. Add Gantt Chart to Project Details

**File**: `frontend/src/pages/ClientDashboard.jsx` (in project detail view)

```jsx
import ProjectGanttChart from '../components/client/ProjectGanttChart';

// When displaying project details
{selectedProject && (
  <div className="mt-6">
    <h2 className="text-2xl font-bold mb-4">Timeline & Milestones</h2>
    <ProjectGanttChart project={selectedProject} />
  </div>
)}
```

## 5. Apply Dark Mode Styling

**Update existing components** to use dark mode classes:

```jsx
// Example component
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-2xl font-bold">Title</h1>
  
  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
    Content here
  </div>
</div>
```

**Key dark mode conversions:**
```
bg-white              → dark:bg-gray-900
bg-gray-50            → dark:bg-gray-800
bg-gray-100           → dark:bg-gray-700
text-gray-900         → dark:text-white
text-gray-600         → dark:text-gray-400
text-gray-500         → dark:text-gray-500
border-gray-200       → dark:border-gray-700
border-gray-300       → dark:border-gray-600
```

## 6. Add Team Members Tab to Admin Dashboard

**File**: `frontend/src/pages/AdminPage.jsx` (AdminDashboard component)

```jsx
// Add import
import { teamMembersAPI } from '../services/api';

// Add tab to sidebar
<button
  onClick={() => setActiveTab('team')}
  className="flex items-center gap-2 w-full px-4 py-2..."
>
  <Users className="w-5 h-5" />
  Team Members
</button>

// Add tab content
{activeTab === 'team' && (
  <TeamMembersPage />
)}
```

## 7. Create Team Members Admin Component

**File**: `frontend/src/components/admin/TeamMembersPage.jsx` (NEW)

```jsx
import { useState, useEffect } from 'react';
import { teamMembersAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

const TeamMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await teamMembersAPI.getAll();
      if (response.data.success) {
        setMembers(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch team members');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Members</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(member => (
            <div
              key={member._id}
              className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {member.role}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {member.skills?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map(skill => (
                    <span
                      key={skill}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-50 text-blue-600 py-1 rounded hover:bg-blue-100">
                  Edit
                </button>
                <button className="flex-1 bg-red-50 text-red-600 py-1 rounded hover:bg-red-100">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembersPage;
```

## 8. Enable Dark Mode in Tailwind Config

**File**: `frontend/tailwind.config.js`

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      // your existing config
    },
  },
  plugins: [],
}
```

## 9. Trigger Activity Creation

Add to existing endpoints where activities should be logged:

**Backend Example** - `backend/controllers/clientController.js`

```javascript
const { createActivity } = require('./activityController');

// When sending a message
exports.sendMessage = async (req, res) => {
  // ... existing code ...
  
  const message = await Message.create(messageData);
  
  // Create activity
  await createActivity({
    clientEmail: message.clientEmail,
    projectId: message.projectId,
    type: 'message',
    title: 'New Message Received',
    description: message.content?.substring(0, 100),
    actor: 'admin',
    actorRole: 'admin',
  });
  
  // ... rest of code ...
};

// When uploading file
exports.uploadFile = async (req, res) => {
  // ... existing code ...
  
  const file = await File.create(fileData);
  
  // Create activity
  await createActivity({
    clientEmail: file.clientEmail,
    projectId: file.projectId,
    type: 'file_upload',
    title: 'New File Uploaded',
    description: `${file.fileName} was uploaded`,
    actor: 'admin',
    metadata: {
      fileName: file.fileName,
      fileSize: file.fileSize,
    },
  });
  
  // ... rest of code ...
};
```

---

## 📝 Styling Tips

### Apply Dark Mode Globally
```css
/* In index.css */
@layer components {
  .dark {
    @apply bg-gray-900 text-white;
  }
}
```

### Create Dark Mode Component Classes
```css
/* Reusable dark mode classes */
.card {
  @apply bg-white text-gray-900;
}

.dark .card {
  @apply bg-gray-800 text-white;
}

.card-border {
  @apply border border-gray-200;
}

.dark .card-border {
  @apply border-gray-700;
}
```

### Animation for Dark Mode
```jsx
// Smooth transition when toggling
<div className="transition-colors duration-300">
  Content here
</div>
```

---

## 🧪 Testing the Features

### Test Activity Timeline
1. Go to client dashboard
2. Click "Activities" tab
3. Should show list of activities
4. Verify icons and timestamps
5. Test pagination ("Load More")

### Test Gantt Chart
1. Go to project details
2. Scroll to "Timeline & Milestones"
3. Should show chart with milestones
4. Verify progress bar updates
5. Hover over bars for details

### Test Dark Mode
1. Click moon/sun icon in navbar
2. Verify all components change colors
3. Refresh page - should remember setting
4. Test in different components

### Test Team Members
1. Go to Admin > Team Members
2. Click "Add Member"
3. Fill form and submit
4. Member should appear in list
5. Edit/delete should work

---

## 🐛 Troubleshooting

### Dark Mode Not Working
- Check if DarkModeProvider wraps the entire app
- Verify `darkMode: 'class'` in tailwind.config.js
- Clear browser cache

### Activity Timeline Empty
- Check if activities are being created in backend
- Verify clientEmail matches in requests
- Check browser console for errors

### Gantt Chart Not Displaying
- Verify project has milestones
- Check milestone dates are valid
- Ensure recharts is installed

### Team Members API Error
- Verify routes registered in server.js
- Check MongoDB connection
- Verify request parameters

---

## 📦 Dependencies (Already Installed)

- `recharts` - For Gantt charts
- `lucide-react` - For icons
- `react-hot-toast` - For notifications
- `axios` - For API calls
- `tailwindcss` - For styling

No additional npm packages needed!

---

## 💾 Database Indexing (Optional)

For better performance with large datasets:

```javascript
// In MongoDB directly
db.activities.createIndex({ clientEmail: 1, createdAt: -1 })
db.activities.createIndex({ projectId: 1, createdAt: -1 })
db.teamMembers.createIndex({ email: 1 })
db.teamMembers.createIndex({ status: 1 })
```

---

## ✅ Feature Completion Checklist

- [ ] Dark mode provider implemented
- [ ] Dark mode toggle in navbar
- [ ] Dark mode CSS classes applied
- [ ] Activity model created
- [ ] Activity controller created
- [ ] Activity routes registered
- [ ] Activity timeline component created
- [ ] Activity tab added to dashboard
- [ ] Gantt chart component created
- [ ] Gantt chart added to project details
- [ ] Team member model created
- [ ] Team member controller created
- [ ] Team member routes registered
- [ ] Team members tab added to admin
- [ ] All tested in browser
- [ ] Data persists after refresh

