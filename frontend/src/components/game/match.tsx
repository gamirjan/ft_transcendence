import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { ip } from '../utils/ip';
import { useNavigate } from 'react-router-dom';
import GameMatch from './Pong';
import {store} from "../redux"
type PaddlePosition = 'left' | 'right';
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
     let width  =1000;
     let height = 600;
     let paddleHeight = (200 * height) / 1080;
  const [room, setRoom] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameDetails, setGameDetails] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isStart,setIsStart] = useState(false)
  const [ballX,setBallX] = useState( width / 2);
  const [ballY,setBallY] = useState( height / 2);
  const [gameScore,setGameScore] = useState({player1:{},player2:{}})
  const [paddleLeftY,setpaddleLeftY] = useState(height / 2 - paddleHeight / 2)
  const [paddleRightY,setpaddleRightY] = useState(height / 2 - paddleHeight / 2)
  const [who,setWho]  = useState("0 : 0")
  const [pos,setPos] = useState("");

 // let ballY = height / 2;
  const navigate = useNavigate();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  let animationFrameId: number;
  let paddleSpeed = 8;
  let ballSpeed = 4;
  let paddleWidth = 25;
  let ballRadius = 10;
  //let paddleLeftY = height / 2 - paddleHeight / 2;
  //let paddleRightY = height / 2 - paddleHeight / 2;

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
  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const y = event.pageY;
    const rect = canvas.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const top = rect.top + scrollY;
    const bottom = rect.bottom + scrollY;
    
    if (y < top || y > (bottom - (paddleHeight))) return;
    
    const tray = (y - top) / canvas.clientHeight;
    socket.emit('tray', tray);
   // document.removeEventListener('mousemove',handleMouseMove);
    };

    const movePaddle = (deltaY: number) => {
      if (pos === 'left') {
        const newPaddleLeftY = paddleLeftY + 1  / 1080;
          socket.emit('tray',newPaddleLeftY);
      } else {
        const newPaddleRightY = paddleRightY + 1 / 1080;
        
          socket.emit('tray',newPaddleRightY);
          //paddleRightY = newPaddleRightY;
      }
    };
useEffect(()=>{
  setTimeout(() => {
    
    //console.log(ballX,ballY);
    
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
    drawPaddle(ctx, 0 + 10, paddleLeftY);
    drawPaddle(ctx, (width - paddleWidth) - 10, paddleRightY);
  
    // Draw ball
    drawBall(ctx, ballX, ballY);
  },100);

},[ballX,ballY,paddleLeftY,paddleRightY]);


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
      
  //    // socket.emit('start');
  //     //document.addEventListener('Ar')
  //     //socket.emit('tray',800);
  //   }, 100);

  //   return () => {
  //       //document.removeEventListener('mousemove', handleMouseMove);
  //     //socket.disconnect();
  //   };
  // }, [[ballX,ballY,paddleLeftY,paddleRightY]]);


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

    socket.on('room', (code,id) => {
        
        console.log("room sdgddfdggrs");
        if(id == user.id)
          setPos("left");
        else
          setPos("right");
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
        // Set up keyboard listeners
        window.addEventListener('keydown', (e) => {
          switch (e.code) {
            case 'ArrowUp':
              movePaddle( -paddleSpeed);
              break;
            case 'ArrowDown':
              movePaddle( paddleSpeed);
              break;
            case 'KeyW':
              movePaddle( -paddleSpeed);
              break;
            case 'KeyS':
              movePaddle( paddleSpeed);
              break;
            default:
              break;
          }
        });
    
        window.addEventListener('keyup', (e) => {
          switch (e.code) {
            case 'ArrowUp':
            case 'ArrowDown':
              movePaddle( 0);
              break;
            case 'KeyW':
            case 'KeyS':
              movePaddle( 0);
              break;
            default:
              break;
          }
        });
    document.addEventListener('mousemove',handleMouseMove);
    document.addEventListener('mouseleave',handleMouseMove);
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
      setGameScore(data)
      if(data.player1.id == user.id)
        setWho( data.player1.score + " : " + data.player2.score);
      else
        setWho( data.player2.score + " : " + data.player1.score);
      
      
    });
    socket.on('tray', (pos,id, tray)=>{
      console.log("trey=>",id, pos,tray);
      if(pos === "left")
        setpaddleLeftY(tray * height);
      else
        setpaddleRightY(tray * height);
      // if(user.id == id)
      //setPlayer(data);

      
    });
    socket.on('stop', (data)=>{
      console.log("stop=>",data);
      setIsStart(false);
      window.location.reload();
      //socket.close();
      
      
    });
    socket.on('disconnect', (data)=>{
      console.log("disconnect=>",data);
      socket.close();
      
    });

    return () => {
     //rs
     document.removeEventListener('mousemove',handleMouseMove)
     console.log("socket closed");
     socket.off('room')
     socket.off('ball')
     socket.close()
     //socket.off();
      //socket.disconnect();
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
  return (isStart ? ( <div className="flex flex-col items-center bg-gray-800">
  <h2 className="text-white text-3xl py-4">Score: {who} </h2> {/* Add a score section */}
  <h3 className="text-white text-2xl py-2">{gameScore.player1.displayname} vs {gameScore.player2.displayname}</h3> {/* Add player names */}
  <div className="flex justify-center items-center h-screen">
    <canvas
      ref={canvasRef}
      className="border-2 border-white"
      width={width}
      height={height}
    />
  </div>
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