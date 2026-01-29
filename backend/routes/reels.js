const express = require('express');
const router = express.Router();
const Reel = require('../models/Reel');
const { auth } = require('./auth');

// Create a new reel
router.post('/', auth, async (req, res) => {
  try {
    const { videoUrl, caption, hashtags } = req.body;
    const reel = new Reel({
      user: req.user.id,
      videoUrl,
      caption,
      hashtags,
    });
    await reel.save();
    res.status(201).json(reel);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create reel', error: err.message });
  }
});

// Get all reels
router.get('/', async (req, res) => {
  try {
    const reels = await Reel.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reels', error: err.message });
  }
});

module.exports = router;
