import React, { useContext } from 'react';
import { AudioPlayerContext } from '../context/AudioPlayerContext';
import './PlayerFooter.css';
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
} from 'react-icons/fa';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlayerFooter = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    togglePlayPause,
    playNextSong,
    playPreviousSong,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
  } = useContext(AudioPlayerContext);

  const currentSong = songs.length > 0 ? songs[currentSongIndex] : null;

  if (!currentSong) {
    return (
      <div className="player-footer">
        <p>Loading song...</p>
      </div>
    );
  }

  return (
    <div className="player-footer">
      <div className="song-info">
        <p className="song-title">{currentSong.name}</p>
      </div>

      <div className="controls">
        <button className="play-button" onClick={playPreviousSong}>
          <FaBackward />
        </button>
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button className="play-button" onClick={playNextSong}>
          <FaForward />
        </button>
      </div>

      <div className="seek-bar">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => seekTo(parseFloat(e.target.value))}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="volume">
        <FaVolumeUp />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PlayerFooter;
