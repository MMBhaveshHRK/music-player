import React from 'react';
import './Sidebar.css';
import { FaHome, FaHeart, FaList, FaMusic } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">🎵 Musicify</h2>
      <ul className="nav-links">
        <li><FaHome /> Home</li>
        <li><FaHeart /> Liked</li>
        <li><FaList /> Playlists</li>
        <li><FaMusic /> Songs</li>
      </ul>
    </div>
  );
};

export default Sidebar;
