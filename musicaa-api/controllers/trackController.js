const Track = require('../models/Tracks');
const multer = require('multer');
const path = require('path');

// Multer config for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

exports.uploadTrack = [upload.fields([{ name: 'audioFile' }, { name: 'coverImage' }]), async (req, res) => {
    try {
        const { title, artist } = req.body;
        const audioFile = req.files.audioFile[0].path;
        const coverImage = req.files.coverImage ? req.files.coverImage[0].path : null;

        const track = new Track({ title, artist, audioFile, coverImage, user: req.user.id });
        await track.save();

        res.json(track);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}];

exports.getTracks = async (req, res) => {
    try {
        const tracks = await Track.find().populate('user', 'username').sort({ createdAt: -1 }).limit(20);
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getRecentlyPlayed = async (req, res) => {
    try {
        const tracks = await Track.find({ user: req.user.id }).sort({ updatedAt: -1 }).limit(5);
        res.json(tracks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.incrementPlayCount = async (req, res) => {
    try {
        const track = await Track.findByIdAndUpdate(req.params.id, { $inc: { playCount: 1 } }, { new: true });
        if (!track) return res.status(404).json({ msg: 'Track not found' });
        res.json(track);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};