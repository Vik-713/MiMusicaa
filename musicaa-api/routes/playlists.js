const express = require('express');
const auth = require('../middleware/auth');
const {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
} = require('../controllers/playlistController');

const router = express.Router();

// All playlist routes require authentication
router.use(auth);

router.post('/', createPlaylist);
router.get('/', getUserPlaylists);
router.get('/:id', getPlaylistById);
router.patch('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.post('/:id/tracks', addTrackToPlaylist);
router.delete('/:id/tracks/:trackId', removeTrackFromPlaylist);

module.exports = router;
