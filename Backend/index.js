const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketUtils = require('./socket');
const watchDatabase = require('./utils/watcher');

// Routes

const messageRoutes = require('./routes/message');
const clientVisibilityRoutes = require('./routes/visibility.routes');
const HomeRoutes = require('./routes/home-routes');
const AboutRoutes = require('./routes/about-routes');
const CertificationRoute = require('./routes/certification-routes');
const EducationRoute = require('./routes/education-routes');
const ExperienceRoute = require('./routes/experience-routes');
const ProjectRoute = require('./routes/project-routes');
const SkillRoute = require('./routes/skills-routes');
const SocialMediaRoute = require('./routes/socialmedia-routes');
const settingsRoutes = require('./routes/settings-routes');
const visitorRoutes = require('./routes/visitor-routes');
const resumeRoutes = require('./routes/resume-routes');
const contactRoutes = require('./routes/contact-routes');
const seoRoutes = require('./routes/seo-routes');
const serviceRoutes = require('./routes/service.routes');
const blogRoutes = require('./routes/blog.routes');
const pageRoutes = require('./routes/page.routes');
const navigationRoutes = require('./routes/navigation.routes');
const sectionRoutes = require('./routes/section.routes');
const githubRoutes = require('./routes/github-routes');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
  // Start database watcher after successful DB connection
  watchDatabase();
});

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
socketUtils.init(server);

app.use(express.json());

app.use(cors({
  origin: ['https://personal-dynamic-portfolio-frontend.onrender.com'],
  credentials: true
}));

// API Routes
app.use('/messages', messageRoutes);
app.use('/visibility', clientVisibilityRoutes);
app.use('/home', HomeRoutes);
app.use('/about', AboutRoutes);
app.use('/certification', CertificationRoute);
app.use('/education', EducationRoute);
app.use('/experience', ExperienceRoute);
app.use('/project', ProjectRoute);
app.use('/skills', SkillRoute);
app.use('/socialmedia', SocialMediaRoute);
app.use('/settings', settingsRoutes);
app.use('/visitors', visitorRoutes);
app.use('/resume', resumeRoutes);
app.use('/contact', contactRoutes);
app.use('/seo', seoRoutes);
app.use('/services', serviceRoutes);
app.use('/blogs', blogRoutes);
app.use('/pages', pageRoutes);
app.use('/navigation', navigationRoutes);
app.use('/sections', sectionRoutes);
app.use('/github', githubRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🌐 User Side Portfolio Backend API with Real-time Updates is running');
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).send(`🔍 Route not found: ${req.originalUrl}`);
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
