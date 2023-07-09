import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { ip } from '../utils/ip';
import { useNavigate } from 'react-router-dom';
import GameMatch from './Pong';
import {store} from "../redux"

const MatchmakingGame = () => {
  const [isSocket,setIsSoket]  = useState(false);
  const [socket,setSocket] = useState(io());

    const user = useSelector((state: any) => state.user);

    if(isSocket == false)
    {

      setSocket( io(`${ip}:4000/pong`,{auth:{
          headers:{
              'USER':JSON.stringify({user})
          },
      },
      
      }));
      setIsSoket(true);
    }
     // Update the server URL and namespace
     let width  =600;
     let height = 200;
  const [room, setRoom] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDetails, setGameDetails] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isStart,setIsStart] = useState(false)
  const [ballX,setBallX] = useState( width / 2);
  const [ballY,setBallY] = useState( height / 2);
 // let ballY = height / 2;
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  let animationFrameId: number;
  let paddleSpeed = 8;
  let ballSpeed = 4;
  let paddleHeight = 80;
  let paddleWidth = 10;
  let ballRadius = 10;
  let paddleLeftY = height / 2 - paddleHeight / 2;
  let paddleRightY = height / 2 - paddleHeight / 2;

  let ballDeltaX = ballSpeed;
  let ballDeltaY = ballSpeed;
  const [player,setPlayer] = useState(0);

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

const update = ()=>{
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
}
useEffect(()=>{
  setTimeout(() => {
    
    console.log(ballX,ballY);
    
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
  },100);

},[ballX,ballY]);


  // useEffect(() => {

  //   let count = 3;
  //   const intervalID = setInterval(() => {
  //     console.log(ballX,ballY);
      
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;
  //     const ctx = canvas.getContext('2d');
  //     if (!ctx) return;
    
  //     // Clear canvas
  //     ctx.clearRect(0, 0, width, height);
    
  //     // Draw border
  //     ctx.strokeStyle = 'white';
  //     ctx.lineWidth = 2;
  //     ctx.strokeRect(0, 0, width, height);
    
  //     // Draw paddles
  //     drawPaddle(ctx, 0, paddleLeftY);
  //     drawPaddle(ctx, width - paddleWidth, paddleRightY);
    
  //     // Draw ball
  //     drawBall(ctx, ballX, ballY);
  //     clearInterval(intervalID);
      
  //     console.log("starttttttttttttttttt");
      
  //     socket.emit('start');
  //     //document.addEventListener('Ar')
  //     //socket.emit('tray',800);
  //   }, 1000);

  //   return () => {
  //      // document.removeEventListener('mousemove', handleMouseMove);
  //     socket.disconnect();
  //   };
  // }, []);


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
        if(!isStart)
        {

          socket.emit('start');
          setIsStart(true);
        }
       // socket.emit('start');
       // navigate('/aa',{replace:true})
        
        
      //setRoom(data);
    });

    socket.on('game:start', (details) => {
        console.log("starttt",details);
      setGameStarted(true);
      setGameDetails(details);
    });
    socket.on('ball', (data)=>{
      setBallX(((data.x * width)/1920))
      setBallY(((data.y * height)/1080))
      // setTimeout(()=>{},2)
      // update();
      //drawBall(ctx, ballX, ballY);

      //console.log("ball=>",data);
      
    });
    socket.on('score', (data)=>{
      console.log("score=>",data);
      
    });
    socket.on('tray', (id, pos)=>{
      console.log("trey=>",id, pos);
      //setPlayer(data);

      
    });
    socket.on('stop', (data)=>{
      console.log("stop=>",data);
      setIsStart(false);
      socket.close();
      
      
    });
    socket.on('disconnect', (data)=>{
      console.log("disconnect=>",data);
      socket.close();
      
    });

    return () => {
     //rs
     console.log("socket closed");
     socket.off('room')
     socket.off('ball')
     socket.close()
     //socket.off();
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
    console.log("havayiiiiiiiiiiiiiiiiiiiii");
    
   // socket.emit('start');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (isStart ? ( <div className="flex justify-center items-center h-screen bg-gray-800">
  <canvas
    ref={canvasRef}
    className="border-2 border-white"
    width={width}
    height={height}
  />
</div>) : 
   ( <div>
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
                  <button >Start Game</button>
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
    </div>)
  );
};

export default MatchmakingGame;