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

// Define schemas
const clientProjectSchema = new mongoose.Schema({
  clientEmail: String,
  title: String,
  description: String,
  status: String,
  progress: Number,
  startDate: Date,
  estimatedCompletion: Date,
  technologies: [String],
  team: [{
    name: String,
    role: String,
    avatar: String,
  }],
  milestones: [{
    title: String,
    description: String,
    completed: Boolean,
    completedDate: Date,
  }],
  createdAt: Date,
  updatedAt: Date,
});

const messageSchema = new mongoose.Schema({
  clientEmail: String,
  subject: String,
  message: String,
  sender: String,
  senderName: String,
  read: Boolean,
  createdAt: Date,
});

const fileSchema = new mongoose.Schema({
  clientEmail: String,
  fileName: String,
  fileUrl: String,
  fileType: String,
  fileSize: Number,
  uploadedBy: String,
  uploadedByName: String,
  description: String,
  createdAt: Date,
});

const ClientProject = mongoose.model('ClientProject', clientProjectSchema);
const Message = mongoose.model('Message', messageSchema);
const File = mongoose.model('File', fileSchema);

// Sample client email (use your test email)
const CLIENT_EMAIL = 'client@example.com'; // Change this to your Google account email for testing

// Sample data
const sampleProjects = [
  {
    clientEmail: CLIENT_EMAIL,
    title: 'E-Commerce Platform',
    description: 'Building a modern e-commerce platform with payment integration, inventory management, and real-time order tracking.',
    status: 'in-progress',
    progress: 65,
    startDate: new Date('2024-01-15'),
    estimatedCompletion: new Date('2024-04-30'),
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    team: [
      { name: 'Sarah Johnson', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Michael Chen', role: 'Lead Developer', avatar: 'https://i.pravatar.cc/150?img=13' },
      { name: 'Emily Rodriguez', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
    milestones: [
      { title: 'Project Kickoff', description: 'Initial planning and requirements gathering', completed: true, completedDate: new Date('2024-01-15') },
      { title: 'Design Phase', description: 'UI/UX design and wireframes', completed: true, completedDate: new Date('2024-02-01') },
      { title: 'Backend Development', description: 'API and database setup', completed: true, completedDate: new Date('2024-02-20') },
      { title: 'Frontend Development', description: 'Building user interface', completed: false },
      { title: 'Testing & QA', description: 'Comprehensive testing', completed: false },
      { title: 'Deployment', description: 'Production deployment', completed: false },
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
  },
  {
    clientEmail: CLIENT_EMAIL,
    title: 'Mobile App Redesign',
    description: 'Complete redesign of existing mobile application with improved UX and modern features.',
    status: 'in-progress',
    progress: 40,
    startDate: new Date('2024-02-01'),
    estimatedCompletion: new Date('2024-05-15'),
    technologies: ['React Native', 'Firebase', 'Redux', 'Figma'],
    team: [
      { name: 'David Park', role: 'Mobile Developer', avatar: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Emily Rodriguez', role: 'UI/UX Designer', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
    milestones: [
      { title: 'User Research', description: 'Understanding user needs', completed: true, completedDate: new Date('2024-02-05') },
      { title: 'Design Mockups', description: 'Creating high-fidelity designs', completed: true, completedDate: new Date('2024-02-15') },
      { title: 'Development', description: 'Implementing new designs', completed: false },
      { title: 'Beta Testing', description: 'User testing phase', completed: false },
    ],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(),
  },
  {
    clientEmail: CLIENT_EMAIL,
    title: 'Marketing Website',
    description: 'SEO-optimized marketing website with blog, portfolio showcase, and contact forms.',
    status: 'completed',
    progress: 100,
    startDate: new Date('2023-11-01'),
    estimatedCompletion: new Date('2023-12-15'),
    technologies: ['Next.js', 'Tailwind CSS', 'Contentful', 'Vercel'],
    team: [
      { name: 'Sarah Johnson', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Alex Thompson', role: 'Full Stack Developer', avatar: 'https://i.pravatar.cc/150?img=14' },
    ],
    milestones: [
      { title: 'Planning', description: 'Content strategy and sitemap', completed: true, completedDate: new Date('2023-11-05') },
      { title: 'Design', description: 'Visual design and branding', completed: true, completedDate: new Date('2023-11-15') },
      { title: 'Development', description: 'Building the website', completed: true, completedDate: new Date('2023-12-01') },
      { title: 'Launch', description: 'Going live', completed: true, completedDate: new Date('2023-12-15') },
    ],
    createdAt: new Date('2023-11-01'),
    updatedAt: new Date('2023-12-15'),
  },
];

const sampleMessages = [
  {
    clientEmail: CLIENT_EMAIL,
    subject: 'Project Milestone Completed',
    message: 'Great news! We\'ve completed the backend development phase of your e-commerce platform. The API is fully functional and ready for frontend integration. We\'re ahead of schedule!',
    sender: 'admin',
    senderName: 'Sarah Johnson',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    subject: 'Design Feedback Needed',
    message: 'Hi! We\'ve uploaded the latest design mockups for your mobile app redesign. Could you please review them and provide your feedback by Friday? We want to make sure everything aligns with your vision.',
    sender: 'admin',
    senderName: 'Emily Rodriguez',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    subject: 'Weekly Progress Update',
    message: 'Here\'s your weekly update:\n\n✅ Completed payment integration\n✅ Implemented user authentication\n🔄 Working on shopping cart functionality\n📅 Next: Order management system\n\nEverything is on track for our target completion date!',
    sender: 'admin',
    senderName: 'Michael Chen',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    subject: 'Meeting Reschedule Request',
    message: 'Good morning! Due to an unexpected conflict, could we reschedule our status meeting from Thursday 2pm to Friday 3pm? Please let me know if that works for you.',
    sender: 'admin',
    senderName: 'Sarah Johnson',
    read: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
  },
];

const sampleFiles = [
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'E-Commerce_Wireframes_v2.pdf',
    fileUrl: 'https://example.com/files/wireframes.pdf',
    fileType: 'application/pdf',
    fileSize: 2458624, // 2.4 MB
    uploadedBy: 'admin',
    uploadedByName: 'Emily Rodriguez',
    description: 'Updated wireframes with your feedback incorporated',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'Mobile_App_Designs.fig',
    fileUrl: 'https://www.figma.com/file/example',
    fileType: 'application/figma',
    fileSize: 5242880, // 5 MB
    uploadedBy: 'admin',
    uploadedByName: 'Emily Rodriguez',
    description: 'Figma file with all mobile app screens',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'API_Documentation.pdf',
    fileUrl: 'https://example.com/files/api-docs.pdf',
    fileType: 'application/pdf',
    fileSize: 1048576, // 1 MB
    uploadedBy: 'admin',
    uploadedByName: 'Michael Chen',
    description: 'Complete API documentation for your reference',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'Project_Timeline.xlsx',
    fileUrl: 'https://example.com/files/timeline.xlsx',
    fileType: 'application/vnd.ms-excel',
    fileSize: 524288, // 512 KB
    uploadedBy: 'admin',
    uploadedByName: 'Sarah Johnson',
    description: 'Updated project timeline and milestones',
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000), // 3 days ago
  },
  {
    clientEmail: CLIENT_EMAIL,
    fileName: 'Brand_Assets.zip',
    fileUrl: 'https://example.com/files/brand-assets.zip',
    fileType: 'application/zip',
    fileSize: 10485760, // 10 MB
    uploadedBy: 'admin',
    uploadedByName: 'Emily Rodriguez',
    description: 'Logo files, color palette, and typography guidelines',
    createdAt: new Date(Date.now() - 168 * 60 * 60 * 1000), // 1 week ago
  },
];

// Seed function
async function seedClientData() {
  try {
    console.log('\n🌱 Starting client data seeding...\n');
    console.log(`📧 Client Email: ${CLIENT_EMAIL}\n`);

    // Clear existing client data
    console.log('🗑️  Clearing existing client data...');
    await ClientProject.deleteMany({ clientEmail: CLIENT_EMAIL });
    await Message.deleteMany({ clientEmail: CLIENT_EMAIL });
    await File.deleteMany({ clientEmail: CLIENT_EMAIL });
    console.log('✓ Existing client data cleared\n');

    // Insert projects
    console.log('📁 Inserting client projects...');
    const projects = await ClientProject.insertMany(sampleProjects);
    console.log(`✓ ${projects.length} projects inserted\n`);

    // Insert messages
    console.log('💬 Inserting messages...');
    const messages = await Message.insertMany(sampleMessages);
    console.log(`✓ ${messages.length} messages inserted\n`);

    // Insert files
    console.log('📎 Inserting files...');
    const files = await File.insertMany(sampleFiles);
    console.log(`✓ ${files.length} files inserted\n`);

    console.log('🎉 Client data seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Messages: ${messages.length}`);
    console.log(`   - Files: ${files.length}`);
    console.log(`   - Client Email: ${CLIENT_EMAIL}\n`);
    console.log('💡 Tip: Change CLIENT_EMAIL variable in seed-client.js to match your Google account for testing\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding client data:', error);
    process.exit(1);
  }
}

// Run the seed function
seedClientData();
