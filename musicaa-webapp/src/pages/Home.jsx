import React, { useState, useEffect } from "react";
import MusicCard from "../components/MusicCard.jsx";
import axios from 'axios';
import { useAuth } from "../App.jsx";

function Section({ title, items, onPlay }) {
  return (
    <section className="mb-8">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, idx) => (
          <MusicCard key={`${title}-${idx}`} {...item} onPlay={() => onPlay(item._id, item)} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [madeForYou, setMadeForYou] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;  // Require login
      try {
        const [recentRes, allRes] = await Promise.all([
          axios.get('/tracks/recent'),
          axios.get('/tracks')
        ]);
        setRecentlyPlayed(recentRes.data.slice(0,5).map(t => ({ ...t, coverColor: '#f5d5c8' })));
        setTrendingNow(allRes.data.slice(0,4).map(t => ({ ...t, coverColor: '#2a2a3e' })));
        setMadeForYou(recentRes.data.slice(0,4).map(t => ({ ...t, coverColor: '#4a5f8f' })));
        setPopularArtists(allRes.data.slice(4,8).map(t => ({ ...t, coverColor: '#a5b8d4' })));
      } catch (err) {
        console.error('Fetch error:', err);
        // Fallback dummy data if API fails
        setRecentlyPlayed([{ title: 'Starlight Symphony', artist: 'The Chromatics Luna Serenade', _id: '1', coverColor: '#f5d5c8' }]);
      }
    };
    fetchData();
  }, [user]);

  const handlePlay = (id, track) => {
    // Set current track in PlayerBar (via context or prop drilling; simplified here)
    console.log('Playing:', track.title);
    // PlayerBar handles increment via its own logic
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white mb-8">Good Evening</h1>
      <Section title="Recently Played" items={recentlyPlayed} onPlay={handlePlay} />
      <Section title="Trending Now" items={trendingNow} onPlay={handlePlay} />
      <Section title="Made for You" items={madeForYou} onPlay={handlePlay} />
      <Section title="Popular Artists" items={popularArtists} onPlay={handlePlay} />
    </div>
  );
}