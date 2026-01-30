const mongoose = require('mongoose');

const ReelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  igUrl: { type: String },
  title: { type: String },
  author: { type: String },
  thumbnail: { type: String },
  embedHtml: { type: String },
  videoUrl: { type: String }, // for backward compatibility or uploaded videos
  caption: { type: String, default: '' },
  hashtags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reel', ReelSchema);