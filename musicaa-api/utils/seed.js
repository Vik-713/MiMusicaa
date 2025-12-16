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
    {
        title: 'Starboy',
        artist: 'The Weeknd',
        album: 'Starboy',
        genre: 'Pop',
        duration: 230,
        coverImage: 'uploads/covers/cover6.jpg',
        audioFile: 'uploads/audio/track6.mp3',
    },
    {
        title: 'Save Your Tears',
        artist: 'The Weeknd',
        album: 'After Hours',
        genre: 'Pop',
        duration: 215,
        coverImage: 'uploads/covers/cover7.jpg',
        audioFile: 'uploads/audio/track7.mp3',
    },
    {
        title: 'Love Nwantiti',
        artist: 'CKay',
        album: 'Boyfriend',
        genre: 'Afrobeats',
        duration: 134,
        coverImage: 'uploads/covers/cover8.jpg',
        audioFile: 'uploads/audio/track8.mp3',
    },
    {
        title: 'Under the Influence',
        artist: 'Chris Brown',
        album: 'Indigo',
        genre: 'R&B',
        duration: 201,
        coverImage: 'uploads/covers/cover9.jpg',
        audioFile: 'uploads/audio/track9.mp3',
    },
    {
        title: 'Die For You',
        artist: 'The Weeknd',
        album: 'Starboy',
        genre: 'Pop',
        duration: 260,
        coverImage: 'uploads/covers/cover10.jpg',
        audioFile: 'uploads/audio/track10.mp3',
    },
    {
        title: 'Levitating',
        artist: 'Dua Lipa',
        album: 'Future Nostalgia',
        genre: 'Pop',
        duration: 203,
        coverImage: 'uploads/covers/cover11.jpg',
        audioFile: 'uploads/audio/track11.mp3',
    },
    {
        title: 'Peaches',
        artist: 'Justin Bieber',
        album: 'Justice',
        genre: 'Pop',
        duration: 198,
        coverImage: 'uploads/covers/cover12.jpg',
        audioFile: 'uploads/audio/track12.mp3',
    },
    {
        title: 'Heat Waves',
        artist: 'Glass Animals',
        album: 'Dreamland',
        genre: 'Alternative',
        duration: 238,
        coverImage: 'uploads/covers/cover13.jpg',
        audioFile: 'uploads/audio/track13.mp3',
    },
    {
        title: 'Shivers',
        artist: 'Ed Sheeran',
        album: '=',
        genre: 'Pop',
        duration: 207,
        coverImage: 'uploads/covers/cover14.jpg',
        audioFile: 'uploads/audio/track14.mp3',
    },
    {
        title: 'Stay',
        artist: 'The Kid LAROI & Justin Bieber',
        album: 'F*ck Love 3: Over You',
        genre: 'Pop',
        duration: 141,
        coverImage: 'uploads/covers/cover15.jpg',
        audioFile: 'uploads/audio/track15.mp3',
    },
    {
        title: 'The Hills',
        artist: 'The Weeknd',
        album: 'Beauty Behind the Madness',
        genre: 'R&B',
        duration: 242,
        coverImage: 'uploads/covers/cover16.jpg',
        audioFile: 'uploads/audio/track16.mp3',
    },
    {
        title: 'Essence',
        artist: 'Wizkid ft. Tems',
        album: 'Made in Lagos',
        genre: 'Afrobeats',
        duration: 244,
        coverImage: 'uploads/covers/cover17.jpg',
        audioFile: 'uploads/audio/track17.mp3',
    },
    {
        title: 'Calm Down',
        artist: 'Rema & Selena Gomez',
        album: 'Rave & Roses',
        genre: 'Afrobeats',
        duration: 239,
        coverImage: 'uploads/covers/cover18.jpg',
        audioFile: 'uploads/audio/track18.mp3',
    },
    {
        title: 'Kill Bill',
        artist: 'SZA',
        album: 'SOS',
        genre: 'R&B',
        duration: 153,
        coverImage: 'uploads/covers/cover19.jpg',
        audioFile: 'uploads/audio/track19.mp3',
    },
    {
        title: 'Creepin',
        artist: 'Metro Boomin, The Weeknd & 21 Savage',
        album: 'Heroes & Villains',
        genre: 'Hip-Hop',
        duration: 221,
        coverImage: 'uploads/covers/cover20.jpg',
        audioFile: 'uploads/audio/track20.mp3',
    },
    {
        title: 'Last Last',
        artist: 'Burna Boy',
        album: 'Love, Damini',
        genre: 'Afrobeats',
        duration: 175,
        coverImage: 'uploads/covers/cover21.jpg',
        audioFile: 'uploads/audio/track21.mp3',
    },
    {
        title: 'Snooze',
        artist: 'SZA',
        album: 'SOS',
        genre: 'R&B',
        duration: 201,
        coverImage: 'uploads/covers/cover22.jpg',
        audioFile: 'uploads/audio/track22.mp3',
    },
    {
        title: 'Often',
        artist: 'The Weeknd',
        album: 'Beauty Behind the Madness',
        genre: 'R&B',
        duration: 249,
        coverImage: 'uploads/covers/cover23.jpg',
        audioFile: 'uploads/audio/track23.mp3',
    },
    {
        title: 'Gravity',
        artist: 'Brent Faiyaz',
        album: 'Wasteland',
        genre: 'R&B',
        duration: 186,
        coverImage: 'uploads/covers/cover24.jpg',
        audioFile: 'uploads/audio/track24.mp3',
    },
    {
        title: 'Peru',
        artist: 'Fireboy DML & Ed Sheeran',
        album: 'Playboy',
        genre: 'Afrobeats',
        duration: 194,
        coverImage: 'uploads/covers/cover25.jpg',
        audioFile: 'uploads/audio/track25.mp3',
    },
    {
        title: 'Earned It',
        artist: 'The Weeknd',
        album: 'Beauty Behind the Madness',
        genre: 'R&B',
        duration: 251,
        coverImage: 'uploads/covers/cover26.jpg',
        audioFile: 'uploads/audio/track26.mp3',
    },
    {
        title: 'Girls Like You',
        artist: 'Maroon 5 ft. Cardi B',
        album: 'Red Pill Blues',
        genre: 'Pop',
        duration: 235,
        coverImage: 'uploads/covers/cover27.jpg',
        audioFile: 'uploads/audio/track27.mp3',
    },
    {
        title: 'Over Now',
        artist: 'Calvin Harris & The Weeknd',
        album: 'Funk Wav Bounces Vol. 2',
        genre: 'Electronic',
        duration: 215,
        coverImage: 'uploads/covers/cover28.jpg',
        audioFile: 'uploads/audio/track28.mp3',
    },
    {
        title: 'Pal Pal',
        artist: 'Talwinder',
        album: 'Pal Pal',
        genre: 'Punjabi',
        duration: 210,
        coverImage: 'uploads/covers/cover29.jpg',
        audioFile: 'uploads/audio/track29.mp3',
    },
    {
        title: 'Zat pat pata pat',
        artist: 'Danny Pandit',
        album: 'Zat pat pata pat',
        genre: 'Marathi',
        duration: 195,
        coverImage: 'uploads/covers/cover30.jpg',
        audioFile: 'uploads/audio/track30.mp3',
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
