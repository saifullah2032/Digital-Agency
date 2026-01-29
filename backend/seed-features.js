require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✓ MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Import models
const Activity = require('./models/Activity');
const TeamMember = require('./models/TeamMember');

// Sample client email (use your test email)
const CLIENT_EMAIL = 'client@example.com';

// Team member data
const sampleTeamMembers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@agency.com',
    role: 'project_manager',
    department: 'Project Management',
    phone: '+1-555-0101',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Experienced project manager with 8+ years in digital agency',
    skills: ['Project Management', 'Agile', 'Scrum', 'Leadership', 'Communication'],
    permissions: {
      canViewProjects: true,
      canEditProjects: true,
      canManageTeam: true,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: true,
      canViewAnalytics: true,
    },
    status: 'active',
    joinDate: new Date('2023-01-15'),
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@agency.com',
    role: 'developer',
    department: 'Development',
    phone: '+1-555-0102',
    avatar: 'https://i.pravatar.cc/150?img=13',
    bio: 'Full Stack Developer specialized in React and Node.js',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'TypeScript', 'AWS'],
    permissions: {
      canViewProjects: true,
      canEditProjects: true,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canViewAnalytics: false,
    },
    status: 'active',
    joinDate: new Date('2023-03-20'),
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@agency.com',
    role: 'designer',
    department: 'Design',
    phone: '+1-555-0103',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'UI/UX Designer with a passion for creating beautiful interfaces',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Wireframing'],
    permissions: {
      canViewProjects: true,
      canEditProjects: true,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canViewAnalytics: false,
    },
    status: 'active',
    joinDate: new Date('2023-02-10'),
  },
  {
    name: 'David Park',
    email: 'david.park@agency.com',
    role: 'developer',
    department: 'Development',
    phone: '+1-555-0104',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Mobile Developer specializing in React Native and Flutter',
    skills: ['React Native', 'Flutter', 'Dart', 'Swift', 'Firebase'],
    permissions: {
      canViewProjects: true,
      canEditProjects: false,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canViewAnalytics: false,
    },
    status: 'active',
    joinDate: new Date('2023-05-01'),
  },
  {
    name: 'Alex Thompson',
    email: 'alex.thompson@agency.com',
    role: 'qa_engineer',
    department: 'Quality Assurance',
    phone: '+1-555-0105',
    avatar: 'https://i.pravatar.cc/150?img=14',
    bio: 'QA Engineer focused on automated testing and performance',
    skills: ['Selenium', 'Jest', 'Test Automation', 'Performance Testing', 'Cypress'],
    permissions: {
      canViewProjects: true,
      canEditProjects: false,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canViewAnalytics: false,
    },
    status: 'active',
    joinDate: new Date('2023-04-15'),
  },
  {
    name: 'Jessica Wong',
    email: 'jessica.wong@agency.com',
    role: 'devops',
    department: 'Infrastructure',
    phone: '+1-555-0106',
    avatar: 'https://i.pravatar.cc/150?img=20',
    bio: 'DevOps Engineer with expertise in cloud infrastructure',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform'],
    permissions: {
      canViewProjects: true,
      canEditProjects: true,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: true,
      canViewAnalytics: true,
    },
    status: 'active',
    joinDate: new Date('2023-06-01'),
  },
  {
    name: 'Marcus Johnson',
    email: 'marcus.johnson@agency.com',
    role: 'developer',
    department: 'Development',
    phone: '+1-555-0107',
    avatar: 'https://i.pravatar.cc/150?img=22',
    bio: 'Backend Developer specializing in scalable systems',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Microservices'],
    permissions: {
      canViewProjects: true,
      canEditProjects: false,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canViewAnalytics: false,
    },
    status: 'active',
    joinDate: new Date('2023-07-10'),
  },
  {
    name: 'Olivia Smith',
    email: 'olivia.smith@agency.com',
    role: 'designer',
    department: 'Design',
    phone: '+1-555-0108',
    avatar: 'https://i.pravatar.cc/150?img=28',
    bio: 'Graphic Designer with experience in branding and marketing',
    skills: ['Adobe XD', 'Illustrator', 'Branding', 'Motion Graphics', 'Visual Design'],
    permissions: {
      canViewProjects: true,
      canEditProjects: false,
      canViewMessages: true,
      canSendMessages: true,
      canUploadFiles: true,
      canDeleteFiles: false,
      canViewAnalytics: false,
    },
    status: 'on_leave',
    joinDate: new Date('2023-08-05'),
  },
];

// Activity data
const sampleActivities = [
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'message',
    title: 'New message from Sarah Johnson',
    description: 'Project milestone completed - backend development phase finished',
    actor: 'Sarah Johnson',
    actorRole: 'admin',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'file_upload',
    title: 'File uploaded: API Documentation',
    description: 'API_Documentation.pdf uploaded by Michael Chen',
    actor: 'Michael Chen',
    actorRole: 'admin',
    metadata: {
      fileName: 'API_Documentation.pdf',
      fileSize: 1048576,
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'status_change',
    title: 'Project status updated',
    description: 'Project status changed from planning to in-progress',
    actor: 'Sarah Johnson',
    actorRole: 'admin',
    metadata: {
      oldStatus: 'planning',
      newStatus: 'in_progress',
    },
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'milestone_update',
    title: 'Milestone completed: Backend Development',
    description: 'Backend Development phase has been marked as complete',
    actor: 'Michael Chen',
    actorRole: 'admin',
    metadata: {
      milestoneTitle: 'Backend Development',
    },
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'Mobile App Redesign',
    type: 'file_upload',
    title: 'Design mockups uploaded',
    description: 'Mobile_App_Designs.fig uploaded by Emily Rodriguez',
    actor: 'Emily Rodriguez',
    actorRole: 'admin',
    metadata: {
      fileName: 'Mobile_App_Designs.fig',
      fileSize: 5242880,
    },
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'Mobile App Redesign',
    type: 'team_update',
    title: 'Team member assigned: David Park',
    description: 'David Park has been assigned to the Mobile App Redesign project',
    actor: 'Sarah Johnson',
    actorRole: 'admin',
    metadata: {
      teamMemberName: 'David Park',
    },
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'message',
    title: 'Weekly progress update from Michael Chen',
    description: 'Payment integration and user authentication completed',
    actor: 'Michael Chen',
    actorRole: 'admin',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'Marketing Website',
    type: 'status_change',
    title: 'Project completed',
    description: 'Marketing Website project has been marked as completed',
    actor: 'Sarah Johnson',
    actorRole: 'admin',
    metadata: {
      oldStatus: 'in_progress',
      newStatus: 'completed',
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'message',
    title: 'Design feedback requested by Emily Rodriguez',
    description: 'Please review the latest design mockups and provide feedback',
    actor: 'Emily Rodriguez',
    actorRole: 'admin',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'Marketing Website',
    type: 'file_upload',
    title: 'Brand assets uploaded',
    description: 'Brand_Assets.zip uploaded with logos and guidelines',
    actor: 'Emily Rodriguez',
    actorRole: 'admin',
    metadata: {
      fileName: 'Brand_Assets.zip',
      fileSize: 10485760,
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'team_update',
    title: 'Team member assigned: Alex Thompson',
    description: 'Alex Thompson (QA Engineer) has been assigned to project',
    actor: 'Sarah Johnson',
    actorRole: 'admin',
    metadata: {
      teamMemberName: 'Alex Thompson',
    },
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'E-Commerce Platform',
    type: 'milestone_update',
    title: 'Milestone started: Frontend Development',
    description: 'Frontend Development phase has been started',
    actor: 'Michael Chen',
    actorRole: 'admin',
    metadata: {
      milestoneTitle: 'Frontend Development',
    },
    createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    projectName: 'Mobile App Redesign',
    type: 'message',
    title: 'Project kickoff meeting scheduled',
    description: 'Initial planning and requirements gathering session',
    actor: 'Sarah Johnson',
    actorRole: 'admin',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
];

// Seed function
async function seedFeatures() {
  try {
    console.log('\n🌱 Starting features data seeding...\n');
    console.log(`📧 Client Email: ${CLIENT_EMAIL}\n`);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Activity.deleteMany({ clientEmail: CLIENT_EMAIL });
    await TeamMember.deleteMany({});
    console.log('✓ Existing data cleared\n');

    // Insert team members
    console.log('👥 Inserting team members...');
    const teamMembers = await TeamMember.insertMany(sampleTeamMembers);
    console.log(`✓ ${teamMembers.length} team members inserted\n`);

    // Insert activities
    console.log('📊 Inserting activities...');
    const activities = await Activity.insertMany(sampleActivities);
    console.log(`✓ ${activities.length} activities inserted\n`);

    console.log('🎉 Features data seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Team Members: ${teamMembers.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Client Email: ${CLIENT_EMAIL}\n`);
    console.log('✨ Data is ready for testing!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding features data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedFeatures();
