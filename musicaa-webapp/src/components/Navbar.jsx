import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, ListMusic, Heart, User } from "lucide-react";
import { useAuth } from "../App.jsx";

export default function Navbar() {
    const location = useLocation();
    const { user, setShowLogin } = useAuth();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: "/", icon: Home, label: "Home" },
        { path: "/search", icon: Search, label: "Search" },
        { path: "/library", icon: Library, label: "Library" },
        { path: "/playlists", icon: ListMusic, label: "Playlists" },
        { path: "/liked", icon: Heart, label: "Liked" },
    ];

    return (
        <nav className="bg-black border-b border-zinc-800 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-white">musicaa</h1>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${isActive(item.path)
                                        ? "bg-green-500 text-black"
                                        : "text-gray-400 hover:text-white hover:bg-zinc-800"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* User Section */}
                <div>
                    {user ? (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded-full px-4 py-2 transition"
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
        </nav>
    );
}
