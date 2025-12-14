
import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black p-4 flex flex-col gap-2">
      <div className="mb-6 px-3">
        <h1 className="text-2xl font-bold text-white">musicaa</h1>
      </div>
      {/* Home Button - Active with green highlight */}
      <button className="flex items-center gap-4 px-4 py-3 bg-green-500 text-black rounded-lg font-semibold">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <span>Home</span>
      </button>
      {/* Other nav items - Gray, hover white */}
      <button className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white rounded-lg transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search</span>
      </button>
      <button className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white rounded-lg transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        <span>Your Library</span>
      </button>
      <button className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white rounded-lg transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>Playlists</span>
      </button>
      <button className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white rounded-lg transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 4v16m8-8H4" />
        </svg>
        <span>Create Playlist</span>
      </button>
      <button className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white rounded-lg transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <span>Liked Songs</span>
      </button>
    </aside>
  );
}