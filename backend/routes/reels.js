const express = require('express');
const router = express.Router();
const Reel = require('../models/Reel');
const { auth } = require('./auth');
const axios = require('axios');

// Create a new reel
router.post('/', auth, async (req, res) => {
  try {
    const { igUrl, caption, hashtags } = req.body;

    if (!igUrl) {
      return res.status(400).json({ message: 'Instagram URL is required' });
    }

    // Validate URL
    if (!igUrl.includes('instagram.com')) {
      return res.status(400).json({ message: 'Invalid Instagram URL' });
    }

    // Fetch oEmbed data
    let title, author_name, thumbnail_url, html;
    if (process.env.IG_TOKEN && process.env.IG_TOKEN !== 'your_instagram_access_token_here') {
      const oEmbedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(igUrl)}&access_token=${process.env.IG_TOKEN}`;
      const response = await axios.get(oEmbedUrl);
      ({ title, author_name, thumbnail_url, html } = response.data);
    } else {
      // Mock data for localhost development
      title = 'Sample Instagram Reel';
      author_name = 'Test User';
      thumbnail_url = 'https://via.placeholder.com/400x600?text=Instagram+Reel';
      html = `<iframe src="${igUrl.replace('instagram.com', 'instagram.com').replace('/reel/', '/reel/').replace('/?', '/embed/?')}embed=1" width="400" height="600" frameborder="0" scrolling="no" allowtransparency="true"></iframe>`;
    }

    const reel = new Reel({
      user: req.user.id,
      igUrl,
      title,
      author: author_name,
      thumbnail: thumbnail_url,
      embedHtml: html,
      caption,
      hashtags,
    });
    await reel.save();
    res.status(201).json(reel);
  } catch (err) {
    if (err.response && err.response.status === 400) {
      return res.status(400).json({ message: 'Invalid or private Instagram post' });
    }
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
