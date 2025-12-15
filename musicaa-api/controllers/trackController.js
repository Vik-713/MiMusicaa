const Track = require('../models/Tracks');
const PlayHistory = require('../models/PlayHistory');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Get all tracks with optional filtering
exports.getTracks = async (req, res) => {
    try {
        const { genre, search } = req.query;
        let query = {};

        if (genre) {
            query.genre = genre;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { artist: { $regex: search, $options: 'i' } },
                { album: { $regex: search, $options: 'i' } },
            ];
        }

        const tracks = await Track.find(query).sort({ createdAt: -1 });
        res.json(tracks);
    } catch (err) {
        console.error('Get tracks error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Stream audio file with range support
exports.streamTrack = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id);
        if (!track) {
            return res.status(404).json({ msg: 'Track not found' });
        }

        const audioPath = path.join(__dirname, '..', track.audioFile);

        if (!fs.existsSync(audioPath)) {
            return res.status(404).json({ msg: 'Audio file not found' });
        }

        const stat = fs.statSync(audioPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(audioPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'audio/mpeg',
            };
            res.writeHead(200, head);
            fs.createReadStream(audioPath).pipe(res);
        }
    } catch (err) {
        console.error('Stream track error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Like a track
exports.likeTrack = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const trackId = req.params.id;

        if (user.likedTracks.includes(trackId)) {
            return res.status(400).json({ msg: 'Track already liked' });
        }

        user.likedTracks.push(trackId);
        await user.save();

        res.json({ msg: 'Track liked', likedTracks: user.likedTracks });
    } catch (err) {
        console.error('Like track error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Unlike a track
exports.unlikeTrack = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const trackId = req.params.id;

        user.likedTracks = user.likedTracks.filter(id => id.toString() !== trackId);
        await user.save();

        res.json({ msg: 'Track unliked', likedTracks: user.likedTracks });
    } catch (err) {
        console.error('Unlike track error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get liked tracks
exports.getLikedTracks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('likedTracks');
        res.json(user.likedTracks);
    } catch (err) {
        console.error('Get liked tracks error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Increment play count and save to history
exports.incrementPlayCount = async (req, res) => {
    try {
        const track = await Track.findByIdAndUpdate(
            req.params.id,
            { $inc: { playCount: 1 } },
            { new: true }
        );

        if (!track) {
            return res.status(404).json({ msg: 'Track not found' });
        }

        // Save to play history if user is authenticated
        if (req.user) {
            await PlayHistory.create({
                user: req.user.id,
                track: req.params.id,
            });
        }

        res.json(track);
    } catch (err) {
        console.error('Increment play count error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get recently played tracks
exports.getRecentlyPlayed = async (req, res) => {
    try {
        const history = await PlayHistory.find({ user: req.user.id })
            .sort({ playedAt: -1 })
            .limit(20)
            .populate('track');

        // Extract unique tracks (remove duplicates)
        const uniqueTracks = [];
        const trackIds = new Set();

        for (const item of history) {
            if (item.track && !trackIds.has(item.track._id.toString())) {
                uniqueTracks.push(item.track);
                trackIds.add(item.track._id.toString());
            }
        }

        res.json(uniqueTracks);
    } catch (err) {
        console.error('Get recently played error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};