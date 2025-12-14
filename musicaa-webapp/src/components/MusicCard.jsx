import React from "react";

export default function MusicCard({ title, artist, coverColor = '#d4a5a5', onPlay }) {
  return (
    <div className="group relative min-w-[160px] max-w-[180px] bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition cursor-pointer" onClick={onPlay}>
      <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden" style={{ backgroundColor: coverColor }}>
        <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold text-2xl">
          {title.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="mb-1">
        <h3 className="text-white font-semibold text-sm truncate">{title}</h3>
        <p className="text-gray-400 text-xs truncate">{artist}</p>
      </div>
      <button className="absolute bottom-24 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
        <svg className="w-6 h-6 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}