const User = require('../models/User');

// Get user's queue
exports.getQueue = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('queue');
        res.json(user.queue);
    } catch (err) {
        console.error('Get queue error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update entire queue
exports.updateQueue = async (req, res) => {
    try {
        const { queue } = req.body;

        if (!Array.isArray(queue)) {
            return res.status(400).json({ msg: 'Queue must be an array' });
        }

        const user = await User.findById(req.user.id);
        user.queue = queue;
        await user.save();

        const updatedUser = await User.findById(req.user.id).populate('queue');
        res.json(updatedUser.queue);
    } catch (err) {
        console.error('Update queue error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Add track to queue
exports.addToQueue = async (req, res) => {
    try {
        const { trackId } = req.body;
        const user = await User.findById(req.user.id);

        user.queue.push(trackId);
        await user.save();

        const updatedUser = await User.findById(req.user.id).populate('queue');
        res.json(updatedUser.queue);
    } catch (err) {
        console.error('Add to queue error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Remove track from queue
exports.removeFromQueue = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.queue = user.queue.filter(id => id.toString() !== req.params.trackId);
        await user.save();

        const updatedUser = await User.findById(req.user.id).populate('queue');
        res.json(updatedUser.queue);
    } catch (err) {
        console.error('Remove from queue error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Clear queue
exports.clearQueue = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.queue = [];
        await user.save();

        res.json({ msg: 'Queue cleared', queue: [] });
    } catch (err) {
        console.error('Clear queue error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
