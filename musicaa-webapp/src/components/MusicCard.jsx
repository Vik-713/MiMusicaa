import React, { useState } from "react";
import { Play, Heart, MoreVertical } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";
import { useAuth } from "../App";
import { trackAPI } from "../services/api";

export default function MusicCard({ track, showArtist = true }) {
  const { playTrack } = usePlayer();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
    playTrack(track);
  };

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert('Please login to like tracks');
      return;
    }

    try {
      if (isLiked) {
        await trackAPI.unlikeTrack(track._id);
        setIsLiked(false);
      } else {
        await trackAPI.likeTrack(track._id);
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Failed to like/unlike track:', err);
    }
  };

  return (
    <div
      className="group relative min-w-[160px] max-w-[180px] bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer"
      onClick={handlePlay}
    >
      {/* Cover Image */}
      <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
        {track.coverImage ? (
          <img
            src={`http://localhost:5001/${track.coverImage}`}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-4xl">
            {track.title.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="mb-1">
        <h3 className="text-white font-semibold text-sm truncate">{track.title}</h3>
        {showArtist && <p className="text-gray-400 text-xs truncate">{track.artist}</p>}
      </div>

      {/* Play Button */}
      <button
        onClick={handlePlay}
        className="absolute bottom-24 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105"
      >
        <Play className="w-6 h-6 text-black ml-0.5" fill="currentColor" />
      </button>

      {/* Like Button */}
      <button
        onClick={handleLike}
        className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart
          className={`w-5 h-5 ${isLiked ? 'text-green-500 fill-green-500' : 'text-white'}`}
        />
      </button>
    </div>
  );
}