import React, { useState, useEffect } from 'react';
import { trackAPI } from '../services/api';
import MusicCard from '../components/MusicCard';

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
    fetchRecentlyPlayed();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await trackAPI.getTracks();
      setTracks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch tracks:', err);
      setLoading(false);
    }
  };

  const fetchRecentlyPlayed = async () => {
    try {
      const response = await trackAPI.getRecentlyPlayed();
      setRecentlyPlayed(response.data);
    } catch (err) {
      // User might not be logged in
      console.log('Not logged in or no recent tracks');
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
        <h1 className="text-3xl font-bold text-white mb-2">Good evening</h1>
        <p className="text-gray-400">Discover your next favorite song</p>
      </div>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Recently Played</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recentlyPlayed.slice(0, 5).map((track) => (
              <MusicCard key={track._id} track={track} />
            ))}
          </div>
        </div>
      )}

      {/* All Tracks */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {tracks.length > 0 ? `All Tracks (${tracks.length})` : 'All Tracks'}
        </h2>
        {tracks.length === 0 ? (
          <div className="flex items-center justify-center py-12 bg-zinc-800/50 rounded-lg">
            <p className="text-gray-400">No tracks available. Please seed the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tracks.map((track) => (
              <MusicCard key={track._id} track={track} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}