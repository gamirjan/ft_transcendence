import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './style.css'
import GameOne from './OneVOne';
import { useNavigate } from 'react-router-dom';
const GameComponent = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [ping, setPing] = useState(0);
  const [username, setUsername] = useState('');
  const [matchmaking, setMatchmaking] = useState(false);
  const [gameplay, setGameplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const host = window.location.href;
    const socket = io.connect(host);

    let interval = setInterval(() => {
      socket.emit('get-ping', callback => {
        setPing(Date.now() - callback);
      });
    }, 500);

    socket.on('player-broadcast', players => {
      setOnlinePlayers(players);
    });

    socket.on('matchmaking-begin', () => {
      setMatchmaking(true);
    });

    socket.on('game-started', data => {
      clearInterval(interval);
      setMatchmaking(false);
      setGameplay(true);
      // Initialize game_state and other logic here
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handleSearchMatch = () => {
    
    // Implement logic to search for a match online
  };

  const handleSinglePlayer = () => {
    // Implement logic for single player mode
  };

  const handleOneVerseOne = () => {
    const state = { width: 800, height: 300 }
    navigate("/mainGame",{replace:true})
    // Implement logic for one versus one mode
  };

  return (
    <div>
      <h1>Pong</h1>
      <h2>Online: {onlinePlayers}</h2>
      <h2>Ping: {ping}ms</h2>
      <h2>
        <a href="https://github.com/pstefa1707/multiplayer-pong">pstefa1707</a>
      </h2>
      {matchmaking ? (
        <div id="match-making">
          <h3>Searching for Match...</h3>
        </div>
      ) : (
        <div id="start-screen">
          <label htmlFor="input-username">Username:</label>
          <input
            id="input-username"
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <input
            className="menu-button"
            id="set-username"
            type="submit"
            value="Search for Match Online"
            onClick={handleSearchMatch}
          />
          <br />
          <input
            className="menu-button"
            id="singleplayer"
            type="submit"
            value="Versus CPU"
            onClick={handleSinglePlayer}
          />
          <input
            className="menu-button"
            id="1v1"
            type="submit"
            value="Versus Local Player"
            onClick={handleOneVerseOne}
          />
        </div>
      )}
      {gameplay && (
        <div id="gameplay" style={{ display: 'flex' }} onResize={fitCanvas}>
          <canvas id="drawing-canvas" width="600" height="500"></canvas>
        </div>
      )}
    </div>
  );
};

export default GameComponent;
