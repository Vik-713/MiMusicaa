const express = require('express');
const auth = require('../middleware/auth');
const { optionalAuth } = require('../middleware/auth');
const {
    getTracks,
    streamTrack,
    likeTrack,
    unlikeTrack,
    getLikedTracks,
    incrementPlayCount,
    getRecentlyPlayed,
} = require('../controllers/trackController');

const router = express.Router();

// Public routes
router.get('/', getTracks);
router.get('/:id/stream', streamTrack);

// Protected routes
router.post('/:id/like', auth, likeTrack);
router.delete('/:id/like', auth, unlikeTrack);
router.get('/liked', auth, getLikedTracks);
router.get('/recent', auth, getRecentlyPlayed);

// Optional auth (saves history if logged in)
router.patch('/:id/play', optionalAuth, incrementPlayCount);

module.exports = router;