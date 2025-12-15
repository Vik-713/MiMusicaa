const express = require('express');
const auth = require('../middleware/auth');
const {
    getQueue,
    updateQueue,
    addToQueue,
    removeFromQueue,
    clearQueue,
} = require('../controllers/queueController');

const router = express.Router();

// All queue routes require authentication
router.use(auth);

router.get('/', getQueue);
router.put('/', updateQueue);
router.post('/', addToQueue);
router.delete('/:trackId', removeFromQueue);
router.delete('/', clearQueue);

module.exports = router;
