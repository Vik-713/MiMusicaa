const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },  // Duration in seconds
  coverImage: { type: String },  // Path to uploaded image
  audioFile: { type: String, required: true },  // Path to uploaded audio
  playCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);