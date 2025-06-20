import React, { useContext } from 'react';
import './Music.css';
import { AudioPlayerContext } from '../context/AudioPlayerContext';

const Music = () => {
  const {
    songs,
    currentSongIndex,
    playSong
  } = useContext(AudioPlayerContext);

  return (
    <div className="music-page">
      <h2 className="heading">Your Songs</h2>
      <ul className="song-list">
        {songs.map((song, index) => (
          <li
            key={index}
            className={index === currentSongIndex ? 'active' : ''}
            onClick={() => playSong(index)}
          >
            🎵 {song.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Music;
