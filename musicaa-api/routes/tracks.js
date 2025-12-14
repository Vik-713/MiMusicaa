const express = require('express');
const auth = require('../middleware/auth');
const { uploadTrack, getTracks, getRecentlyPlayed, incrementPlayCount } = require('../controllers/trackController');
const router = express.Router();

router.use(auth);  // All track routes require auth

router.post('/upload', uploadTrack);
router.get('/', getTracks);
router.get('/recent', getRecentlyPlayed);
router.patch('/:id/play', incrementPlayCount);

module.exports = router;