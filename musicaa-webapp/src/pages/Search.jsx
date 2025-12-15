import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { trackAPI } from '../services/api';
import MusicCard from '../components/MusicCard';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(false);

    const genres = ['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz'];

    useEffect(() => {
        fetchTracks();
    }, [selectedGenre]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                fetchTracks();
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchTracks = async () => {
        setLoading(true);
        try {
            const params = {};
            if (searchQuery) params.search = searchQuery;
            if (selectedGenre) params.genre = selectedGenre;

            const response = await trackAPI.getTracks(params);
            setTracks(response.data);
        } catch (err) {
            console.error('Failed to fetch tracks:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-6">Search</h1>

                {/* Search Input */}
                <div className="relative mb-6">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-800 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Genre Filters */}
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedGenre('')}
                        className={`px-4 py-2 rounded-full transition ${selectedGenre === ''
                            ? 'bg-green-500 text-black'
                            : 'bg-zinc-800 text-white hover:bg-zinc-700'
                            }`}
                    >
                        All
                    </button>
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-2 rounded-full transition ${selectedGenre === genre
                                ? 'bg-green-500 text-black'
                                : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div>
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-400">Loading...</p>
                    </div>
                ) : tracks.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-400">
                            {searchQuery || selectedGenre
                                ? 'No tracks found'
                                : 'Start searching for tracks'}
                        </p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-bold text-white mb-4">
                            {searchQuery ? `Results for "${searchQuery}"` : selectedGenre ? `${selectedGenre} Tracks` : 'All Tracks'}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {tracks.map((track) => (
                                <MusicCard key={track._id} track={track} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
