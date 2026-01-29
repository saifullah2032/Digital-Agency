require('dotenv').config();
const mongoose = require('mongoose');
const Client = require('./models/Client');
const Project = require('./models/Project');
const ClientProject = require('./models/ClientProject');
const Message = require('./models/Message');
const File = require('./models/File');

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

// Sample data with valid image URLs
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with payment integration, inventory management, and real-time order tracking. Built with React, Node.js, and MongoDB.',
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=450&h=350&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
  },
  {
    title: 'Healthcare Management System',
    description: 'Complete healthcare solution for hospitals with patient records, appointment scheduling, and billing.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=450&h=350&fit=crop',
    technologies: ['Angular', 'Express', 'PostgreSQL', 'AWS', 'Docker'],
    liveUrl: 'https://example-healthcare.com',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media managers to track engagement, schedule posts, and analyze performance.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=450&h=350&fit=crop',
    technologies: ['Vue.js', 'Firebase', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://example-dashboard.com',
  },
  {
    title: 'Restaurant Reservation App',
    description: 'Mobile-first application for restaurant reservations with real-time table availability and menu browsing.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=450&h=350&fit=crop',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://example-restaurant.com',
  },
];

const sampleClients = [
  {
    name: 'John Smith',
    designation: 'CEO at Tech Solutions Inc',
    description: 'Exceptional work! The team delivered exactly what we needed on time and within budget.',
    imageUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Sarah Williams',
    designation: 'Marketing Director at Digital Marketing Pro',
    description: 'Professional, responsive, and highly skilled. Highly recommend!',
    imageUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Michael Johnson',
    designation: 'Founder at StartUp Ventures',
    description: 'Great communication and excellent results. They understood our vision perfectly.',
    imageUrl: 'https://i.pravatar.cc/150?img=3',
  },
];

const CLIENT_EMAIL = 'client@example.com';

const sampleClientProjects = [
  {
    clientEmail: CLIENT_EMAIL,
    title: 'E-Commerce Platform',
    description: 'Building a modern e-commerce platform with payment integration and real-time tracking.',
    status: 'in-progress',
    progress: 65,
    startDate: new Date('2024-01-15'),
    estimatedCompletion: new Date('2024-04-30'),
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    team: [
      { name: 'Sarah Johnson', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Michael Chen', role: 'Lead Developer', avatar: 'https://i.pravatar.cc/150?img=13' },
    ],
    milestones: [
      { title: 'Project Kickoff', description: 'Planning and requirements', completed: true, completedDate: new Date('2024-01-15') },
      { title: 'Design Phase', description: 'UI/UX design', completed: true, completedDate: new Date('2024-02-01') },
      { title: 'Backend Development', description: 'API and database', completed: true, completedDate: new Date('2024-02-20') },
      { title: 'Frontend Development', description: 'User interface', completed: false },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    clientEmail: CLIENT_EMAIL,
    title: 'Mobile App Redesign',
    description: 'Complete redesign with improved UX and modern features.',
    status: 'in-progress',
    progress: 40,
    startDate: new Date('2024-02-01'),
    estimatedCompletion: new Date('2024-05-15'),
    technologies: ['React Native', 'Firebase', 'Redux'],
    team: [
      { name: 'David Park', role: 'Mobile Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
    ],
    milestones: [
      { title: 'User Research', description: 'Understanding user needs', completed: true, completedDate: new Date('2024-02-05') },
      { title: 'Design Mockups', description: 'Creating high-fidelity designs', completed: false },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
];

const sampleMessages = [
  {
    clientEmail: CLIENT_EMAIL,
    subject: 'Project Milestone Completed',
    message: 'Great news! We\'ve completed the backend development phase. The API is fully functional and ready for integration.',
    sender: 'admin',
    senderName: 'Sarah Johnson',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    subject: 'Design Review Meeting',
    message: 'Let\'s schedule a design review meeting for next Tuesday at 2 PM to discuss the latest mockups.',
    sender: 'admin',
    senderName: 'Emily Rodriguez',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

const sampleFiles = [
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'Project_Proposal.pdf',
    fileUrl: 'https://example.com/files/proposal.pdf',
    fileType: 'pdf',
    fileSize: 2048000,
    uploadedBy: 'admin',
    uploadedByName: 'Sarah Johnson',
    description: 'Initial project proposal and requirements document',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'Design_Mockups_v2.zip',
    fileUrl: 'https://example.com/files/mockups.zip',
    fileType: 'zip',
    fileSize: 15360000,
    uploadedBy: 'admin',
    uploadedByName: 'Emily Rodriguez',
    description: 'Latest UI/UX design mockups and wireframes',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

const reseedDatabase = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await Project.deleteMany({});
    await Client.deleteMany({});
    await ClientProject.deleteMany({});
    await Message.deleteMany({});
    await File.deleteMany({});
    console.log('✓ Cleared existing data');

    // Insert new data
    console.log('Seeding Projects...');
    await Project.insertMany(sampleProjects);
    console.log(`✓ Inserted ${sampleProjects.length} projects`);

    console.log('Seeding Clients...');
    await Client.insertMany(sampleClients);
    console.log(`✓ Inserted ${sampleClients.length} clients`);

    console.log('Seeding Client Projects...');
    await ClientProject.insertMany(sampleClientProjects);
    console.log(`✓ Inserted ${sampleClientProjects.length} client projects`);

    console.log('Seeding Messages...');
    await Message.insertMany(sampleMessages);
    console.log(`✓ Inserted ${sampleMessages.length} messages`);

    console.log('Seeding Files...');
    await File.insertMany(sampleFiles);
    console.log(`✓ Inserted ${sampleFiles.length} files`);

    console.log('\n✓ Database reseeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error reseeding database:', error);
    process.exit(1);
  }
};

reseedDatabase();
