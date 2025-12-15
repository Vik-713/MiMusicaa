const mongoose = require('mongoose');

const playHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track', required: true },
    playedAt: { type: Date, default: Date.now },
});

// Index for efficient queries
playHistorySchema.index({ user: 1, playedAt: -1 });

module.exports = mongoose.model('PlayHistory', playHistorySchema);
