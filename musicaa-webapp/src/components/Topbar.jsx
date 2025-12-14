import React from "react";
import { useAuth } from "../App.jsx";  // Import context

export default function TopBar() {
  const { setShowLogin } = useAuth();

  return (
    <div className="sticky top-0 z-20 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <button className="p-2 rounded-full bg-black hover:bg-zinc-800 transition">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-black hover:bg-zinc-800 transition">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="flex-1 max-w-xl">
            <div className="flex items-center gap-3 bg-zinc-800 rounded-full px-4 py-2.5">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="What you want to listen to?"
                className="bg-transparent outline-none w-full placeholder:text-gray-400 text-sm text-white"
              />
            </div>
          </div>
        </div>
        <button onClick={() => setShowLogin(true)} className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-black font-bold text-lg">
          M
        </button>
      </div>
    </div>
  );
}