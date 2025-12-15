import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, ListMusic, Plus, Heart } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/library", icon: Library, label: "Your Library" },
  ];

  const libraryItems = [
    { path: "/playlists", icon: ListMusic, label: "Playlists" },
    { path: "/liked", icon: Heart, label: "Liked Songs" },
  ];

  return (
    <aside className="w-64 bg-black p-4 flex flex-col gap-2">
      <div className="mb-6 px-3">
        <h1 className="text-2xl font-bold text-white">musicaa</h1>
      </div>

      {/* Main Navigation */}
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition ${isActive(item.path)
              ? "bg-green-500 text-black"
              : "text-gray-400 hover:text-white"
            }`}
        >
          <item.icon className="w-6 h-6" />
          <span>{item.label}</span>
        </Link>
      ))}

      <div className="border-t border-zinc-800 my-2"></div>

      {/* Library Items */}
      {libraryItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${isActive(item.path)
              ? "bg-zinc-800 text-white"
              : "text-gray-400 hover:text-white"
            }`}
        >
          <item.icon className="w-6 h-6" />
          <span>{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}