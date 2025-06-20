import React from 'react';
import Sidebar from './components/Sidebar';
import Music from './music/Music';
import PlayerFooter from './components/PlayerFooter';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to Music Player</h1>
        <Music />
      </div>
      <PlayerFooter />
    </div>
  );
}

export default App; 
