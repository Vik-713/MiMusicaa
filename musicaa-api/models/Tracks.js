const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  coverImage: { type: String },  // Path to uploaded image
  audioFile: { type: String, required: true },  // Path to uploaded audio
  playCount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Track', trackSchema);