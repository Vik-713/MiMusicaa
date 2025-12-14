import React, { useState, useEffect } from "react";
import { useAuth } from "../App.jsx";
import axios from 'axios';

export default function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45);
  const [currentTrack, setCurrentTrack] = useState({ title: 'Midnight Drive', artist: 'Synthwave Collective', id: null });
  const { user } = useAuth();

  const handlePlay = async (trackId) => {
    if (trackId && user) {
      try {
        await axios.patch(`/tracks/${trackId}/play`);
      } catch (err) {
        console.error('Play count error');
      }
    }
    setIsPlaying(true);
  };

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      if (isPlaying) setProgress(p => Math.min(p + 1, 100));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-zinc-900 border-t border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 min-w-[180px]">
          <div className="w-14 h-14 bg-blue-900 rounded"></div>
          <div>
            <div className="text-white text-sm font-medium">{currentTrack.title}</div>
            <div className="text-gray-400 text-xs">{currentTrack.artist}</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zM16 6l-10 6 10 6z"/>
              </svg>
            </button>
            <button
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6h-2v12h2zM8 6l10 6-10 6z"/>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400 min-w-[40px]">0:45</span>
            <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-xs text-gray-400 min-w-[40px]">5:20</span>
          </div>
        </div>
        <div className="flex items-center gap-2 min-w-[180px] justify-end">
          <button className="text-gray-400 hover:text-white transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}