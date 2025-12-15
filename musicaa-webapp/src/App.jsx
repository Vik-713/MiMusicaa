import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/Topbar.jsx";
import PlayerBar from "./components/PlayerBar.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Library from "./pages/Library.jsx";
import { PlayerProvider } from "./contexts/PlayerContext.jsx";
import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';
axios.defaults.baseURL = API_BASE;

// Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );
  const [showLogin, setShowLogin] = useState(false);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Set token on initial load
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, showLogin, setShowLogin }}>
      <PlayerProvider>
        <Router>
          <div className="flex h-screen bg-zinc-900 text-white overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black px-8 pt-6 pb-32 scrollbar-hide">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/liked" element={<Library />} />
                  <Route path="/playlists" element={<Library />} />
                </Routes>
              </main>
            </div>
            <PlayerBar />
          </div>

          {/* Login Modal */}
          {showLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-zinc-800 p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                  {user ? 'Account Details' : 'Login / Register'}
                </h2>
                {user ? (
                  <div className="space-y-4">
                    <div className="bg-zinc-700 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xl">
                          {user.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{user.username}</h3>
                          <p className="text-gray-400 text-sm">Member</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-zinc-600">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Email</p>
                        <p className="text-white text-sm">{user.email}</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">User ID</p>
                        <p className="text-gray-500 text-xs font-mono">{user.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowLogin(false);
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 py-2.5 rounded-lg font-semibold transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-full p-2 mb-2 bg-zinc-700 rounded"
                      id="username"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 mb-2 bg-zinc-700 rounded"
                      id="email"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 mb-2 bg-zinc-700 rounded"
                      id="password"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          const data = {
                            username: document.getElementById('username').value,
                            email: document.getElementById('email').value,
                            password: document.getElementById('password').value,
                          };
                          try {
                            const res = await axios.post('/auth/register', data);
                            login(res.data.token, res.data.user);
                            setShowLogin(false);
                          } catch (err) {
                            alert(err.response?.data?.msg || 'Registration failed');
                          }
                        }}
                        className="flex-1 bg-green-500 py-2 rounded hover:bg-green-600 transition"
                      >
                        Register
                      </button>
                      <button
                        onClick={async () => {
                          const data = {
                            email: document.getElementById('email').value,
                            password: document.getElementById('password').value,
                          };
                          try {
                            const res = await axios.post('/auth/login', data);
                            login(res.data.token, res.data.user);
                            setShowLogin(false);
                          } catch (err) {
                            alert(err.response?.data?.msg || 'Login failed');
                          }
                        }}
                        className="flex-1 bg-blue-500 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Login
                      </button>
                    </div>
                  </>
                )}
                <button
                  onClick={() => setShowLogin(false)}
                  className="mt-4 text-gray-400 hover:text-white transition"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Router>
      </PlayerProvider>
    </AuthContext.Provider>
  );
}