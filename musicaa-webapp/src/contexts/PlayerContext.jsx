import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { trackAPI } from '../services/api';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => playNext();

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const playTrack = async (track) => {
        if (currentTrack?._id === track._id) {
            togglePlay();
            return;
        }

        setCurrentTrack(track);
        audioRef.current.src = trackAPI.streamTrack(track._id);
        audioRef.current.play();
        setIsPlaying(true);

        // Increment play count
        try {
            await trackAPI.incrementPlayCount(track._id);
        } catch (err) {
            console.error('Failed to increment play count:', err);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        if (queue.length > 0) {
            const nextTrack = queue[0];
            setQueue(queue.slice(1));
            playTrack(nextTrack);
        }
    };

    const playPrevious = () => {
        if (currentTime > 3) {
            audioRef.current.currentTime = 0;
        } else {
            // Could implement previous track logic here
        }
    };

    const seekTo = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const addToQueue = (track) => {
        setQueue([...queue, track]);
    };

    const removeFromQueue = (index) => {
        setQueue(queue.filter((_, i) => i !== index));
    };

    const clearQueue = () => {
        setQueue([]);
    };

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                queue,
                currentTime,
                duration,
                volume,
                playTrack,
                togglePlay,
                playNext,
                playPrevious,
                seekTo,
                setVolume,
                addToQueue,
                removeFromQueue,
                clearQueue,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
