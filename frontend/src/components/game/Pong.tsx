import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { ip } from '../utils/ip';




const GameMatch = ({gameSock}) => {
  const user = useSelector((state: AppState) => state.user);

    var i = 0
  const pongRef = useRef(null);
  const endDialogRef = useRef(false);
  const winnerRef = useRef('');
  const inputRef = useRef([]);
  const mapColorRef = useRef('#121212');
  const pong = pongRef.current;
  const dispatch = useDispatch();
  const history = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  let animationFrameId: number;
  let width = 500;
  let height = 200;
  let paddleSpeed = 8;
  let ballSpeed = 4;
  let paddleHeight = 80;
  let paddleWidth = 10;
  let ballRadius = 10;
  let paddleLeftY = height / 2 - paddleHeight / 2;
  let paddleRightY = height / 2 - paddleHeight / 2;
  let ballX = width / 2;
  let ballY = height / 2;
  let ballDeltaX = ballSpeed;
  let ballDeltaY = ballSpeed;
  const [score, setScore] = useState<{ left: number; right: number }>({
    left: 0,
    right: 0,
  });
  const leaveRoomHandler = () => {
	endDialogRef.current = false;
	gameSock.disconnect();
	history("/home",{replace:true});
  };

const drawPaddle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
};

const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = 'white'
};
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
	console.log("-----------------------------------------------------------------");
	
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
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
    
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
    
      // Draw border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, width, height);
    
      // Draw paddles
      drawPaddle(ctx, 0, paddleLeftY);
      drawPaddle(ctx, width - paddleWidth, paddleRightY);
    
      // Draw ball
      drawBall(ctx, ballX, ballY);
      clearInterval(intervalID);
      
      console.log("starttttttttttttttttt",i++);
      window.addEventListener('keydown', (e) => {
        switch (e.code) {
          case 'ArrowUp':
            movePaddle('right', -paddleSpeed);
            break;
          case 'ArrowDown':
            movePaddle('right', paddleSpeed);
            break;
          default:
            break;
        }
      });
  
      window.addEventListener('keyup', (e) => {
        switch (e.code) {
          case 'ArrowUp':
          case 'ArrowDown':
            movePaddle('right', 0);
            break;
          default:
            break;
        }
      });
      gameSock.emit('start');
      gameSock.emit('tray',3);
    }, 1000);

    return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        pongRef.current = null;
      gameSock.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pong = pongRef.current;
    
  }, [gameSock]);



return (
	<div>
	<div className="container mx-auto h-full">
	  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
	  </div>
	  <div className="flex justify-center items-center h-full">
		<div className="card bg-green p-4">
		  <div className="text-center font-bold text-3xl mt-6">
			{/* {usersInGame[0].username} */}user 1
			<span className="text-white"> VS </span>
			{/* {usersInGame[1].username} */}user 2
		  </div>
      <div className="flex justify-center items-center h-screen bg-gray-800">
      <canvas
        ref={canvasRef}
        className="border-2 border-white"
        width={500}
        height={150}
      />
    </div>
		</div>
	  </div>
	</div>
  </div>
);
};

export default GameMatch;