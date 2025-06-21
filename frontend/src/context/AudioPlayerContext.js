import React, { createContext, useState, useRef, useEffect } from 'react';

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  // ✅ Fix ESLint warning by including isPlaying as dependency
  useEffect(() => {
    const loadSongs = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/songs`);
        const data = await res.json();
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };
    loadSongs();
  }, [isPlaying]); // previously []

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error('Play failed', err));
    }
    setIsPlaying(!isPlaying);
  };

  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.log('Autoplay blocked', e));
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <AudioPlayerContext.Provider
      value={{
        songs,
        currentSongIndex,
        isPlaying,
        playSong,
        togglePlayPause,
        playNextSong,
        playPreviousSong,
        audioRef,
        currentTime,
        duration,
        seekTo,
        volume,
        setVolume,
      }}
    >
      {children}
      {songs.length > 0 && (
        <audio
          ref={audioRef}
          src={songs[currentSongIndex].src}
          onEnded={playNextSong}
          onTimeUpdate={updateTime}
          onLoadedMetadata={onLoadedMetadata}
        />
      )}
    </AudioPlayerContext.Provider>
  );
};
