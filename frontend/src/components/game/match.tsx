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

      setSocket( io(`${ip}:4000/pong`,{
        autoConnect:false,
        auth:{
          headers:{
              'USER':JSON.stringify({user})
          },
          
      },
      
      }));
      setIsSoket(true);
    }
    useEffect(()=>{
      socket.connect()
      socket.on("connection",(data)=>{
        console.log("conectionnnnn");
      })
      return()=>{
        socket.disconnect();
      }
    },[])

     // Update the server URL and namespace
     let width  =600;
     let height = 300;
     let paddleHeight = ((200 * height) / 1080) /2;
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
  const [trayy,setTrayy] = useState(0.500)
  const [chat,setChat] = useState([]);

 // let ballY = height / 2;
  const navigate = useNavigate();
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  let animationFrameId: number;
  let paddleSpeed = 8;
  let ballSpeed = 4;
  let paddleWidth = 20;
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
    // console.log(tray);
    
    socket.emit('tray', tray);
    };

    const movePaddle = (deltaY: number) => {
      if (pos === 'left') {
        const newPaddleLeftY = paddleLeftY + 1  / 1080;
          socket.emit('tray',0.25 );
      } else {
        const newPaddleRightY = paddleRightY + 1 / 1080;
        
          socket.emit('tray',0.25);
          //paddleRightY = newPaddleRightY;
      }
    };
    function handleKeyDown(event) {
      if (event.key === 'w') {
        calculateTray('up');
        // console.log(trayy);
        socket.emit('tray', calculateTray('up'));
      } else if (event.key === 's') {
        calculateTray('down');
        // console.log(trayy);
        socket.emit('tray', calculateTray('down'));
      }
    }
    
    function handleKeyUp(event) {
      if (event.key === 'w' || event.key === 's') {
        //setTrayy(0);
        socket.emit('tray', trayy);
      }
    }
    
    function calculateTray(direction) {
      const trayIncrement = 0.1;
      const trayMax = 1;
      const trayMin = 0;
      let tray = 0;
      if (direction === 'up') {
       tray =  Math.max(trayMin, trayy - trayIncrement);
      } else if (direction === 'down') {
        tray =  Math.min(trayMax, tray + trayIncrement);
      }
    // console.log("call=>",tray);
    
      return tray;
    }

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

},[ballX,ballY,paddleLeftY,paddleRightY,trayy]);

useEffect(() => {
    socket.onopen = function(event) {
        // console.log('Connected to the server');
        
        // Send data to the server
        const data = user;
        socket.send(data);
      };
    socket.on('connect', () => {
       console.log('Connected to server');
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
        // console.log("starttt",details);
      setGameStarted(true);
      setGameDetails(details);
    });
        // Set up keyboard listeners
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
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
      // console.log("score=>",data);
      setGameScore(data)
      if(data.player1.id == user.id)
        setWho( data.player1.score + " : " + data.player2.score);
      else
        setWho( data.player2.score + " : " + data.player1.score);
      
      
    });
    socket.on('tray', (pos,id, tray)=>{
      //console.log("trey=>",id, pos,tray);
      setTrayy(tray);
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
    socket.on('chat',(data)=>{
      console.log("chatt",data);
      
    })

    return () => {
     //rs
     document.removeEventListener('mousemove',handleMouseMove)
     document.removeEventListener('keydown', handleKeyDown);
     document.removeEventListener('keyup', handleKeyUp);
    document.removeEventListener('mouseleave',handleMouseMove);
     console.log("socket closed");
     socket.off('room')
     socket.off('ball')
     socket.disconnect();
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
  return (isStart ? ( 
  <>
 

  <div className="flex flex-col items-center bg-gray-800">
  <h2 className="text-white text-3xl py-4">Score: {who} </h2> {/* Add a score section */}
  <h3 className="text-white text-2xl py-2">{gameScore.player1.displayname} vs {gameScore.player2.displayname}</h3> {/* Add player names */}
  <div className="flex justify-center items-center h-screen">
  <div className="flex flex-col h-screen">
   Chat Content 
  <div className="flex-1 p-4 overflow-y-auto">
     Chat Messages 
    <div className="space-y-4">
    </div>
  </div>

   Chat Input and Send Button 
  <div className="p-4 bg-gray-100">
    <div className="flex space-x-2">
       Input field 
      <input type="text" className="flex-1 p-2 border border-gray-300 rounded" placeholder="Type your message"/>

       Send button 
      <button className="px-4 py-2 text-white bg-blue-500 rounded">Send</button>
    </div>
  </div>
</div>
    <canvas
      ref={canvasRef}
      className="border-2 border-white"
      width={width}
      height={height}
    />
  </div>
</div></>) : 
   ( <div className="bg-grey h-full text-white p-4 flex flex-col items-center">
   <h1 className="text-4xl mb-8 text-darkBlue">Matchmaking Game</h1>
   {user && (
     <div className="flex flex-col items-center">
     <p className="text-red-500 mb-5">Connected as: {user.displayname}</p>
     {!room && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="border border-red-500 bg-darkGrey px-4 py-2 rounded-md text-white mb-4 focus:outline-none focus:border-red-600 transition-colors duration-300"
              placeholder="Enter your name"
            />
            <button
              onClick={joinQueue}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors duration-300"
            >
              Join Queue
            </button>
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