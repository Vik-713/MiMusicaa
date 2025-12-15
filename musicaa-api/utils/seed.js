const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Track = require('../models/Tracks');

dotenv.config();

const sampleTracks = [
    {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        genre: 'Pop',
        duration: 200,
        coverImage: 'uploads/covers/cover1.jpg',
        audioFile: 'uploads/audio/track1.mp3',
    },
    {
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        album: 'A Night at the Opera',
        genre: 'Rock',
        duration: 354,
        coverImage: 'uploads/covers/cover2.jpg',
        audioFile: 'uploads/audio/track2.mp3',
    },
    {
        title: 'HUMBLE.',
        artist: 'Kendrick Lamar',
        album: 'DAMN.',
        genre: 'Hip-Hop',
        duration: 177,
        coverImage: 'uploads/covers/cover3.jpg',
        audioFile: 'uploads/audio/track3.mp3',
    },
    {
        title: 'One More Time',
        artist: 'Daft Punk',
        album: 'Discovery',
        genre: 'Electronic',
        duration: 320,
        coverImage: 'uploads/covers/cover4.jpg',
        audioFile: 'uploads/audio/track4.mp3',
    },
    {
        title: 'Take Five',
        artist: 'Dave Brubeck',
        album: 'Time Out',
        genre: 'Jazz',
        duration: 324,
        coverImage: 'uploads/covers/cover5.jpg',
        audioFile: 'uploads/audio/track5.mp3',
    },
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing tracks
        await Track.deleteMany({});
        console.log('Cleared existing tracks');

        // Insert sample tracks
        await Track.insertMany(sampleTracks);
        console.log(`Inserted ${sampleTracks.length} sample tracks`);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
}

seedDatabase();
