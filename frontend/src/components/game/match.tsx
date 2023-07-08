import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { ip } from '../utils/ip';
import { useNavigate } from 'react-router-dom';

const MatchmakingGame = () => {
    const user = useSelector((state: AppState) => state.user);
    const socket = io(`${ip}:4000/pong`,{auth:{
        headers:{
            'USER':JSON.stringify({user})
        },
    },
    
    });
     // Update the server URL and namespace
  const [room, setRoom] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDetails, setGameDetails] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    socket.onopen = function(event) {
        console.log('Connected to the server');
        
        // Send data to the server
        const data = user;
        socket.send(data);
      };
    socket.on('connect', () => {
      console.log('Connected to server',);
    });

    socket.on('info', (data) => {
        console.log("info",data);
        
      //setUser(data.user);
    });

    socket.on('room', (data) => {
        
        console.log("room sdgddfdggrs",data);
        socket.emit('start');
        navigate('/aa',{replace:true})
        
        
      //setRoom(data);
    });

    socket.on('game:start', (details) => {
        console.log("starttt",details);
      setGameStarted(true);
      setGameDetails(details);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinQueue = () => {;
    console.log("dddafswfwf",user);
    
    socket.emit('queue',{data:user});
  };

  const joinRoom = () => {
    socket.emit('room', inputValue);
  };

  const ready = () => {
    socket.emit('ready', {});
  };

  const startGame = () => {
    socket.emit('start');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <h1>Matchmaking Game</h1>
      {user && (
        <div>
          <p>Connected as: {user.username}</p>
          {!room && (
            <div>
              <input type="text" value={inputValue} onChange={handleInputChange} />
              <button onClick={joinRoom}>Join Room</button>
              <button onClick={joinQueue}>Join Queue</button>
            </div>
          )}
          {room && (
            <div>
              <p>Room: {room.code}</p>
              {!gameStarted && (
                <div>
                  <button onClick={ready}>Ready</button>
                  <button onClick={startGame}>Start Game</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {gameStarted && gameDetails && (
        <div>
          <h2>Game Started!</h2>
          {/* Render game details */}
        </div>
      )}
    </div>
  );
};

export default MatchmakingGame;