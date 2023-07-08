import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ip } from '../utils/ip';




const gameSock = io(`${ip}:4000/pong`);
const GameMatch = (data) => {

  const canvasRef = useRef(null);
  const pongRef = useRef(null);
  const endDialogRef = useRef(false);
  const winnerRef = useRef('');
  const inputRef = useRef([]);
  const mapColorRef = useRef('#121212');
  const canvas = canvasRef.current;
  const pong = pongRef.current;
  const dispatch = useDispatch();
  const history = useNavigate()

  const leaveRoomHandler = () => {
	endDialogRef.current = false;
	gameSock.disconnect();
	history("/home",{replace:true});
  };

//   const handleReady = (options) => {
// 	if (pong) {
// 	  pong.options = options;
// 	  changeColor(options.input.plan);
// 	}
//   };
const handleMouseMove = (event) => {
	
	if (!pong) return;
	const y = event.pageY;
	if (y < window.pageYOffset + canvas.getBoundingClientRect().top) return;
	if (y > canvas.clientHeight + window.pageYOffset + canvas.getBoundingClientRect().top) return;
	const tray = (event.pageY - window.pageYOffset - canvas.getBoundingClientRect().top) / canvas.clientHeight;
	pong.updateTray(me, tray);
	gameSock.emit('tray', tray);
  };

  const handleBall = (ball) => {
	console.log(ball);
	
	if (pong) {
	  pong.updateBall(ball.x, ball.y);
	}
  };

  const handleScore = (scores) => {
	console.log(scores);
	
	if (pong) {
	  pong.updateScore(scores);
	}
  };

  const handleTray = (player, tray) => {
	console.log(player,tray);
	
	if (pong) {
	  pong.updateTray(player, tray);
	}
  };

  const handleStop = (user) => {
	console.log(user);
	
	winnerRef.current = user.username;
	if (pong) {
	  pong.draw();
	}
	document.removeEventListener('mousemove', handleMouseMove);
	pongRef.current = null;
	endDialogRef.current = true;
	gameSock.disconnect();
  };
  const changeColor = (colorId) => {
	if (colorId === 0)
	  mapColorRef.current = '#121212';
	if (colorId === 1)
	  mapColorRef.current = '#040a80';
	if (colorId === 2)
	  mapColorRef.current = '#db9c14';
  };

  const handleDisconnect = () => {
	dispatch(setGameRoom(''));
	gameSock.disconnect();
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const pong = pongRef.current;

    let count = 3;
    const intervalID = setInterval(() => {
      if (count && pong) {
        pong.context.clearRect(
          0,
          0,
          options.display.width,
          options.display.height,
        );
        pong.context.beginPath();
        pong.context.fillStyle = 'white';
        pong.context.font = '48px Impact';
        pong.context.fillText(count, options.display.width / 2, options.display.height / 2);
        pong.context.closePath();
        return count--;
      }
      clearInterval(intervalID);
      gameSock.emit('start');
    }, 1000);

    return () => {
      if (pong) {
        document.removeEventListener('mousemove', handleMouseMove);
        pongRef.current = null;
      }
      gameSock.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pong = pongRef.current;

    if (!canvas || !pong) return;

    document.addEventListener('mousemove', handleMouseMove);
    gameSock.on('ball', handleBall);
    gameSock.on('score', handleScore);
    gameSock.on('tray', handleTray);
    gameSock.on('stop', handleStop);
    gameSock.on('disconnect', handleDisconnect);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      gameSock.off('ball', handleBall);
      gameSock.off('score', handleScore);
      gameSock.off('tray', handleTray);
      gameSock.off('stop', handleStop);
      gameSock.off('disconnect', handleDisconnect);
    };
  }, [gameSock]);



return (
	<div>
	<div className="container mx-auto h-full">
	  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
		{endDialogRef.current && (
		  <div className="bg-white p-4 rounded-lg max-w-sm">
			<div className="bg-primary text-white text-center font-bold text-2xl p-4 rounded-t-lg">
			  GAME INFO
			</div>
			<div className="text-h2 p-12 text-center">{winnerRef.current} has won!</div>
			<div className="flex justify-end p-4">
			  <button className="bg-blue text-white py-2 px-4 rounded-lg" onClick={leaveRoomHandler}>
				Leave Room
			  </button>
			</div>
		  </div>
		)}
	  </div>
	  <div className="flex justify-center items-center h-full">
		<div className="card bg-green p-4">
		  <div className="text-center font-bold text-3xl mt-6">
			{/* {usersInGame[0].username} */}user 1
			<span className="text-white"> VS </span>
			{/* {usersInGame[1].username} */}user 2
		  </div>
		  <canvas ref={canvasRef} style={{ backgroundColor: mapColorRef.current }} className="mx-5 my-5" id="pong"></canvas>
		</div>
	  </div>
	</div>
  </div>
);
};

export default GameMatch;