import React from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { usePlayer } from "../contexts/PlayerContext";
import { useAuth } from "../App";
import { trackAPI } from "../services/api";

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    playNext,
    playPrevious,
    seekTo,
    setVolume,
  } = usePlayer();

  const { user } = useAuth();
  const [isLiked, setIsLiked] = React.useState(false);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seekTo(percentage * duration);
  };

  const handleLike = async () => {
    if (!user || !currentTrack) {
      alert('Please login to like tracks');
      return;
    }

    try {
      if (isLiked) {
        await trackAPI.unlikeTrack(currentTrack._id);
        setIsLiked(false);
      } else {
        await trackAPI.likeTrack(currentTrack._id);
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Failed to like/unlike track:', err);
    }
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-zinc-900 border-t border-zinc-800">
        <div className="flex items-center justify-center px-4 py-3">
          <p className="text-gray-400 text-sm">No track playing</p>
        </div>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-zinc-900 border-t border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded overflow-hidden">
            {currentTrack.coverImage ? (
              <img
                src={`http://localhost:5001/${currentTrack.coverImage}`}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                {currentTrack.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <div className="text-white text-sm font-medium">{currentTrack.title}</div>
            <div className="text-gray-400 text-xs">{currentTrack.artist}</div>
          </div>
          <button onClick={handleLike} className="ml-2">
            <Heart
              className={`w-5 h-5 ${isLiked ? 'text-green-500 fill-green-500' : 'text-gray-400 hover:text-white'}`}
            />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <button
              onClick={playPrevious}
              className="text-gray-400 hover:text-white transition"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-black" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={playNext}
              className="text-gray-400 hover:text-white transition"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <div
              className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden cursor-pointer group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-green-500 rounded-full transition-all relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400 min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 min-w-[180px] justify-end">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>
    </div>
  );
}