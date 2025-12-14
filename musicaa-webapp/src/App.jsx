import React, { createContext, useContext, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import PlayerBar from "./components/PlayerBar.jsx";
import Home from "./pages/Home.jsx";
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';  // Update if needed
axios.defaults.baseURL = API_BASE;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Auth Context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
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

  return (
    <AuthContext.Provider value={{ user, login, logout, showLogin, setShowLogin }}>
      <div className="flex h-screen bg-zinc-900 text-white overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black px-8 pt-6 pb-32 scrollbar-hide">
            <Home />
          </main>
        </div>
        <PlayerBar />
      </div>

      {/* Simple Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{user ? 'Logout' : 'Login / Register'}</h2>
            {user ? (
              <button onClick={logout} className="w-full bg-red-500 py-2 rounded">Logout</button>
            ) : (
              <>
                <input type="text" placeholder="Username" className="w-full p-2 mb-2 bg-zinc-700 rounded" id="username" />
                <input type="email" placeholder="Email" className="w-full p-2 mb-2 bg-zinc-700 rounded" id="email" />
                <input type="password" placeholder="Password" className="w-full p-2 mb-2 bg-zinc-700 rounded" id="password" />
                <div className="flex gap-2">
                  <button onClick={async () => {
                    const data = { username: document.getElementById('username').value, email: document.getElementById('email').value, password: document.getElementById('password').value };
                    try {
                      const res = await axios.post('/auth/register', data);
                      login(res.data.token, res.data.user);
                      setShowLogin(false);
                    } catch (err) { alert(err.response.data.msg); }
                  }} className="flex-1 bg-green-500 py-2 rounded">Register</button>
                  <button onClick={async () => {
                    const data = { email: document.getElementById('email').value, password: document.getElementById('password').value };
                    try {
                      const res = await axios.post('/auth/login', data);
                      login(res.data.token, res.data.user);
                      setShowLogin(false);
                    } catch (err) { alert(err.response.data.msg); }
                  }} className="flex-1 bg-blue-500 py-2 rounded">Login</button>
                </div>
              </>
            )}
            <button onClick={() => setShowLogin(false)} className="mt-4 text-gray-400">Close</button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}