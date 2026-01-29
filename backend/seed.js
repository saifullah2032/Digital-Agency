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

// Define schemas (same as in models folder)
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  technologies: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  testimonial: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  image: { type: String },
  position: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);
const Client = mongoose.model('Client', clientSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Sample data
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with payment integration, inventory management, and real-time order tracking. Built with React, Node.js, and MongoDB.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=450&h=350&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
  },
  {
    title: 'Healthcare Management System',
    description: 'Complete healthcare solution for hospitals with patient records, appointment scheduling, and billing. Features secure authentication and HIPAA compliance.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=450&h=350&fit=crop',
    technologies: ['Angular', 'Express', 'PostgreSQL', 'AWS', 'Docker'],
    liveUrl: 'https://example-healthcare.com',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media managers to track engagement, schedule posts, and analyze performance across multiple platforms.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=450&h=350&fit=crop',
    technologies: ['Vue.js', 'Firebase', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://example-dashboard.com',
    githubUrl: 'https://github.com/example/social-dashboard',
  },
  {
    title: 'Restaurant Reservation App',
    description: 'Mobile-first application for restaurant reservations with real-time table availability, menu browsing, and customer reviews.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=450&h=350&fit=crop',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://example-restaurant.com',
  },
  {
    title: 'Real Estate Listing Platform',
    description: 'Property listing website with advanced search filters, virtual tours, mortgage calculator, and agent messaging system.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=450&h=350&fit=crop',
    technologies: ['Next.js', 'GraphQL', 'Prisma', 'Google Maps API'],
    liveUrl: 'https://example-realestate.com',
    githubUrl: 'https://github.com/example/realestate',
  },
  {
    title: 'Fitness Tracking Application',
    description: 'Comprehensive fitness app with workout plans, calorie tracking, progress charts, and social features to connect with other fitness enthusiasts.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=450&h=350&fit=crop',
    technologies: ['Flutter', 'Django', 'PostgreSQL', 'TensorFlow'],
    liveUrl: 'https://example-fitness.com',
  },
];

const sampleClients = [
  {
    name: 'Sarah Johnson',
    company: 'TechStart Inc.',
    position: 'CEO',
    testimonial: 'Working with this team was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and exceeded all our expectations. Highly recommended!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Michael Chen',
    company: 'HealthCare Solutions',
    position: 'CTO',
    testimonial: 'The healthcare management system they built for us has transformed our operations. The attention to detail and security features are outstanding.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=13',
  },
  {
    name: 'Emily Rodriguez',
    company: 'Social Buzz Marketing',
    position: 'Marketing Director',
    testimonial: 'Our social media dashboard has made managing multiple clients so much easier. The analytics are comprehensive and the UI is intuitive.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'David Park',
    company: 'Gourmet Bistro',
    position: 'Owner',
    testimonial: 'The reservation app has increased our bookings by 40%. Customers love the ease of use and we love the admin features.',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Jennifer Williams',
    company: 'Prime Properties',
    position: 'Real Estate Broker',
    testimonial: 'Our new listing platform has revolutionized how we showcase properties. The virtual tours feature is a game changer!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=9',
  },
  {
    name: 'Alex Thompson',
    company: 'FitLife Gym',
    position: 'Founder',
    testimonial: 'The fitness app they developed has helped us retain members and attract new ones. The user experience is top-notch.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=14',
  },
];

const sampleContacts = [
  {
    name: 'Robert Anderson',
    email: 'robert.anderson@example.com',
    message: 'I\'m interested in getting a custom web application built for my business. Can we schedule a consultation?',
  },
  {
    name: 'Lisa Martinez',
    email: 'lisa.martinez@company.com',
    message: 'We need a mobile app for our restaurant chain. What\'s your process and timeline?',
  },
  {
    name: 'James Wilson',
    email: 'james.w@startup.io',
    message: 'Looking for a team to help with UI/UX redesign of our existing platform. Do you offer design services?',
  },
];

const sampleSubscribers = [
  { email: 'subscriber1@example.com' },
  { email: 'subscriber2@example.com' },
  { email: 'subscriber3@example.com' },
  { email: 'subscriber4@example.com' },
  { email: 'subscriber5@example.com' },
];

// Seed function
async function seedDatabase() {
  try {
    console.log('\n🌱 Starting database seeding...\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Client.deleteMany({});
    await Contact.deleteMany({});
    await Subscription.deleteMany({});
    console.log('✓ Existing data cleared\n');

    // Insert projects
    console.log('📁 Inserting projects...');
    const projects = await Project.insertMany(sampleProjects);
    console.log(`✓ ${projects.length} projects inserted\n`);

    // Insert clients/testimonials
    console.log('👥 Inserting clients/testimonials...');
    const clients = await Client.insertMany(sampleClients);
    console.log(`✓ ${clients.length} clients inserted\n`);

    // Insert contacts
    console.log('📧 Inserting contact inquiries...');
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(`✓ ${contacts.length} contacts inserted\n`);

    // Insert subscribers
    console.log('📬 Inserting newsletter subscribers...');
    const subscribers = await Subscription.insertMany(sampleSubscribers);
    console.log(`✓ ${subscribers.length} subscribers inserted\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Clients: ${clients.length}`);
    console.log(`   - Contacts: ${contacts.length}`);
    console.log(`   - Subscribers: ${subscribers.length}\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
