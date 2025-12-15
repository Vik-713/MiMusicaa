import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { useAuth } from "../App.jsx";

export default function TopBar() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-20 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-black hover:bg-zinc-800 transition"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="p-2 rounded-full bg-black hover:bg-zinc-800 transition"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2 bg-black hover:bg-zinc-800 rounded-full px-4 py-2 transition"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                {user.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-white font-semibold">{user.username}</span>
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-full transition"
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}