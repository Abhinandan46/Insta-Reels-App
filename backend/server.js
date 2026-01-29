const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const reelsRouter = require('./routes/reels');
const { router: authRouter } = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Auth routes
app.use('/api/auth', authRouter);
// API routes
app.use('/api/reels', reelsRouter);
app.use('/api/posts', require('./routes/posts'));

// Serve frontend static files (if dist exists)
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../frontend/dist/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).json({ message: 'Backend API is running. Frontend not available.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
