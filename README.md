# MiMusicaa - Spotify-like Music Streaming Application

A full-stack music streaming application built with Node.js/Express backend and React frontend, featuring JWT authentication, audio streaming with range support, playlists, and user interactions.

## Features

### Backend (musicaa-api)
- **Authentication**: JWT-based user authentication (register/login)
- **Audio Streaming**: HTTP range request support for smooth playback
- **Track Management**: Browse, search, and filter tracks by genre
- **User Interactions**: Like/unlike tracks, create playlists, manage queue
- **Play History**: Track listening history for authenticated users
- **Demo Data**: Seed script with 30 sample tracks across multiple genres

### Frontend (musicaa-webapp)
- **Spotify-like UI**: Dark theme with smooth animations
- **Audio Player**: Full-featured player with play/pause, seek, volume controls
- **Pages**: Home, Search, Library with track browsing
- **Guest Browsing**: View and play tracks without authentication
- **User Features**: Like tracks, create playlists, manage queue (requires login)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads

### Frontend
- React
- React Router
- Tailwind CSS
- Axios for API calls
- Lucide React for icons

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd musicaa-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

4. Seed the database with demo tracks:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd musicaa-webapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tracks
- `GET /api/tracks` - Get all tracks (public, supports ?genre=Pop&search=query)
- `GET /api/tracks/:id/stream` - Stream audio file (public)
- `POST /api/tracks/:id/like` - Like track (protected)
- `DELETE /api/tracks/:id/like` - Unlike track (protected)
- `GET /api/tracks/liked` - Get liked tracks (protected)
- `PATCH /api/tracks/:id/play` - Increment play count (optional auth)
- `GET /api/tracks/recent` - Get recently played (protected)

### Playlists
- `POST /api/playlists` - Create playlist (protected)
- `GET /api/playlists` - Get user playlists (protected)
- `GET /api/playlists/:id` - Get playlist by ID (protected)
- `PATCH /api/playlists/:id` - Update playlist (protected)
- `DELETE /api/playlists/:id` - Delete playlist (protected)
- `POST /api/playlists/:id/tracks` - Add track to playlist (protected)
- `DELETE /api/playlists/:id/tracks/:trackId` - Remove track from playlist (protected)

### Queue
- `GET /api/queue` - Get queue (protected)
- `PUT /api/queue` - Update queue (protected)
- `POST /api/queue` - Add to queue (protected)
- `DELETE /api/queue/:trackId` - Remove from queue (protected)
- `DELETE /api/queue` - Clear queue (protected)

## Usage

1. **Guest Browsing**: Open the app and browse/play tracks without logging in
2. **Register/Login**: Click "Log in" button to create an account or sign in
3. **Search**: Use the search page to find tracks by name, artist, or filter by genre
4. **Like Tracks**: Click the heart icon on tracks (requires login)
5. **Create Playlists**: Navigate to Library to create and manage playlists (requires login)
6. **Play Music**: Click on any track card or use the player controls at the bottom

## Project Structure

```
musicaa-api/
├── controllers/       # Request handlers
├── models/           # Mongoose schemas
├── routes/           # API routes
├── middleware/       # Auth middleware
├── utils/            # Seed script
└── server.js         # Entry point

musicaa-webapp/
├── src/
│   ├── components/   # React components
│   ├── pages/        # Page components
│   ├── contexts/     # React contexts
│   ├── services/     # API service layer
│   └── App.jsx       # Main app component
```

## Notes

- **Demo Data**: Tracks are seed data and cannot be uploaded by users
- **Audio Files**: The seed script references audio files in `uploads/` directory (you'll need to add actual audio files)
- **Cover Images**: Track cover images are also in `uploads/` directory
- **User Data**: Only user-specific data (likes, playlists, queue, history) is stored in the database

## License

MIT
