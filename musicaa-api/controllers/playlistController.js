const Playlist = require('../models/Playlist');
const User = require('../models/User');

// Create a new playlist
exports.createPlaylist = async (req, res) => {
    try {
        const { name, description, coverImage } = req.body;

        const playlist = new Playlist({
            name,
            description,
            coverImage,
            user: req.user.id,
            tracks: [],
        });

        await playlist.save();

        // Add playlist to user's playlists
        const user = await User.findById(req.user.id);
        user.playlists.push(playlist._id);
        await user.save();

        res.status(201).json(playlist);
    } catch (err) {
        console.error('Create playlist error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get all user playlists
exports.getUserPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ user: req.user.id }).populate('tracks');
        res.json(playlists);
    } catch (err) {
        console.error('Get playlists error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Get single playlist by ID
exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('tracks');

        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        // Check if user owns the playlist
        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        res.json(playlist);
    } catch (err) {
        console.error('Get playlist error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Update playlist
exports.updatePlaylist = async (req, res) => {
    try {
        const { name, description, coverImage } = req.body;
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        if (name) playlist.name = name;
        if (description !== undefined) playlist.description = description;
        if (coverImage !== undefined) playlist.coverImage = coverImage;

        await playlist.save();
        res.json(playlist);
    } catch (err) {
        console.error('Update playlist error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Delete playlist
exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        await Playlist.findByIdAndDelete(req.params.id);

        // Remove from user's playlists
        const user = await User.findById(req.user.id);
        user.playlists = user.playlists.filter(id => id.toString() !== req.params.id);
        await user.save();

        res.json({ msg: 'Playlist deleted' });
    } catch (err) {
        console.error('Delete playlist error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Add track to playlist
exports.addTrackToPlaylist = async (req, res) => {
    try {
        const { trackId } = req.body;
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        if (playlist.tracks.includes(trackId)) {
            return res.status(400).json({ msg: 'Track already in playlist' });
        }

        playlist.tracks.push(trackId);
        await playlist.save();

        const updatedPlaylist = await Playlist.findById(req.params.id).populate('tracks');
        res.json(updatedPlaylist);
    } catch (err) {
        console.error('Add track to playlist error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Remove track from playlist
exports.removeTrackFromPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) {
            return res.status(404).json({ msg: 'Playlist not found' });
        }

        if (playlist.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        playlist.tracks = playlist.tracks.filter(id => id.toString() !== req.params.trackId);
        await playlist.save();

        const updatedPlaylist = await Playlist.findById(req.params.id).populate('tracks');
        res.json(updatedPlaylist);
    } catch (err) {
        console.error('Remove track from playlist error:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};
