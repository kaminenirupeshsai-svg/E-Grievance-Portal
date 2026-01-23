// Updated server.js - uses environment variables, CORS, and improved session cookie config.
// Replace your existing server.js with this or merge the changes shown.

require('dotenv').config(); // load local .env for development (don't commit .env)
const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const app = express();

// Basic middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - allow your pages site + allow credentials for cookie-based sessions
const allowedOrigins = [
  'https://kaminenirupeshsai-svg.github.io',
  'https://kaminenirupeshsai-svg.github.io/E-Grievance-Portal'
  // add your frontend/dev origins if needed, e.g. 'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Use environment variables with sensible defaults
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/egrievance';
const SESSION_SECRET = process.env.SESSION_SECRET || 'change_this_in_production';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Session and MongoStore
app.use(session({
  name: 'egrievance.sid',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    // optionally set ttl, collectionName, etc.
  }),
  cookie: {
    httpOnly: true,
    secure: NODE_ENV === 'production', // cookie only sent over HTTPS in production
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // 'none' required for cross-site cookies but needs secure=true
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));

// Static files (for docs / public static serve in server deployments)
app.use(express.static(path.join(__dirname, 'public')));

// Import and mount routes (ensure these files exist as in your repo)
const pagesRoutes = require('./routes/pages');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaint');
const adminRoutes = require('./routes/admin');
const grievanceRoutes = require('./routes/grievance');
const officerRoutes = require('./routes/officer');

app.use('/', pagesRoutes);
app.use('/auth', authRoutes);
app.use('/complaint', complaintRoutes);
app.use('/admin', adminRoutes);
app.use('/grievance', grievanceRoutes);
app.use('/officer', officerRoutes);

// Optional dashboard route - keep the try/catch pattern you had
try {
  const dashboardRoutes = require('./routes/dashboard');
  app.use('/dashboard', dashboardRoutes);
} catch (e) {
  console.log('⚠️ dashboard.js not found. Skipping dashboard route.');
}

// Fallback home route (if you want server to serve index)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server using environment-provided PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} (NODE_ENV=${NODE_ENV})`));

module.exports = app;


