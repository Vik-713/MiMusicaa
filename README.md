# 🎵 Musicaa – Music Streaming Platform

A full-stack music streaming web application built using React for the frontend and Node.js with Express for the backend.

---

## 📌 Overview

Musicaa is a web-based music streaming application that allows users to browse tracks, play music, search songs, manage playlists, and maintain a playback queue. The project follows a client-server architecture with a React frontend communicating with a REST API backend.

---

## ✨ Features

- User Authentication
- Browse Music Library
- Search Tracks
- Audio Playback
- Playback Queue Management
- Playlist Management
- Play History
- Album Cover & Audio Upload Support
- Responsive User Interface

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📁 Project Structure

```
Musicaa/
│
├── musicaa-webapp/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── musicaa-api/             # Express Backend
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── uploads/
    │   ├── audio/
    │   └── covers/
    ├── utils/
    ├── server.js
    └── package.json
```

---

## 📦 Backend Modules

### Controllers

- Authentication
- Track Management
- Playlist Management
- Queue Management

### Models

- User
- Track
- Playlist
- Play History

### Routes

- Authentication
- Tracks
- Playlists
- Queue

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/musicaa.git

cd musicaa
```

---

## Backend Setup

```bash
cd musicaa-api

npm install

npm start
```

---

## Frontend Setup

```bash
cd musicaa-webapp

npm install

npm run dev
```

---

## 🎧 Frontend Pages

- Home
- Library
- Search

---

## 🧩 Main Components

- Navbar
- Sidebar
- Topbar
- Music Card
- Player Bar

---

## 📂 Media Storage

Uploaded files are stored in:

```
uploads/
├── audio/
└── covers/
```

---

## 📚 Learning Outcomes

This project demonstrates:

- Full-Stack Web Development
- React Application Development
- REST API Development
- MongoDB Integration
- User Authentication
- State Management using React Context
- Audio File Management
- CRUD Operations

---

## 👨‍💻 Author

**Viketh Hegde**

B.Tech Computer Science Engineering

---

## 📄 License

This project is developed for educational and academic purposes.
