import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

// Track API
export const trackAPI = {
    getTracks: (params) => api.get('/tracks', { params }),
    getTrack: (id) => api.get(`/tracks/${id}`),
    streamTrack: (id) => `${API_BASE}/tracks/${id}/stream`,
    likeTrack: (id) => api.post(`/tracks/${id}/like`),
    unlikeTrack: (id) => api.delete(`/tracks/${id}/like`),
    getLikedTracks: () => api.get('/tracks/liked'),
    incrementPlayCount: (id) => api.patch(`/tracks/${id}/play`),
    getRecentlyPlayed: () => api.get('/tracks/recent'),
};

// Playlist API
export const playlistAPI = {
    createPlaylist: (data) => api.post('/playlists', data),
    getUserPlaylists: () => api.get('/playlists'),
    getPlaylist: (id) => api.get(`/playlists/${id}`),
    updatePlaylist: (id, data) => api.patch(`/playlists/${id}`, data),
    deletePlaylist: (id) => api.delete(`/playlists/${id}`),
    addTrackToPlaylist: (id, trackId) => api.post(`/playlists/${id}/tracks`, { trackId }),
    removeTrackFromPlaylist: (id, trackId) => api.delete(`/playlists/${id}/tracks/${trackId}`),
};

// Queue API
export const queueAPI = {
    getQueue: () => api.get('/queue'),
    updateQueue: (queue) => api.put('/queue', { queue }),
    addToQueue: (trackId) => api.post('/queue', { trackId }),
    removeFromQueue: (trackId) => api.delete(`/queue/${trackId}`),
    clearQueue: () => api.delete('/queue'),
};

export default api;
