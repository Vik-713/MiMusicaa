import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ListMusic } from 'lucide-react';
import { useAuth } from '../App';
import { trackAPI, playlistAPI } from '../services/api';
import MusicCard from '../components/MusicCard';

export default function Library() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [likedTracks, setLikedTracks] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }
        fetchLibraryData();
    }, [user, navigate]);

    const fetchLibraryData = async () => {
        try {
            const [likedResponse, playlistsResponse] = await Promise.all([
                trackAPI.getLikedTracks(),
                playlistAPI.getUserPlaylists(),
            ]);
            setLikedTracks(likedResponse.data);
            setPlaylists(playlistsResponse.data);
        } catch (err) {
            console.error('Failed to fetch library data:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Your Library</h1>
                <p className="text-gray-400">Your liked songs and playlists</p>
            </div>

            {/* Liked Songs */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold text-white">Liked Songs</h2>
                    <span className="text-gray-400">({likedTracks.length})</span>
                </div>
                {likedTracks.length === 0 ? (
                    <p className="text-gray-400">No liked songs yet</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {likedTracks.map((track) => (
                            <MusicCard key={track._id} track={track} />
                        ))}
                    </div>
                )}
            </div>

            {/* Playlists */}
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <ListMusic className="w-6 h-6 text-green-500" />
                    <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
                    <span className="text-gray-400">({playlists.length})</span>
                </div>
                {playlists.length === 0 ? (
                    <p className="text-gray-400">No playlists yet. Create one to get started!</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {playlists.map((playlist) => (
                            <div
                                key={playlist._id}
                                onClick={() => navigate(`/playlist/${playlist._id}`)}
                                className="group bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer"
                            >
                                <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                    <ListMusic className="w-16 h-16 text-white" />
                                </div>
                                <h3 className="text-white font-semibold text-sm truncate">{playlist.name}</h3>
                                <p className="text-gray-400 text-xs truncate">
                                    {playlist.tracks.length} tracks
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
