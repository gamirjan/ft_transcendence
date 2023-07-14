import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { ip } from '../utils/ip';
import LayoutProvider from ".././LayoutProvider";
import { useNavigate } from 'react-router-dom';
import {setUser, store} from "../redux"
import Game from './Game';
type PaddlePosition = 'left' | 'right';
const MatchmakingGame = () => {
  const [isSocket,setIsSoket]  = useState(false);
  const [socket,setSocket] = useState(io());

    const user = useSelector((state: any) => state.user);
    if(isSocket == false)
    {

      setSocket( io(`${ip}:4000/pong`,{
        closeOnBeforeunload:true,
        protocols:'ws',
        secure:true,
        randomizationFactor:0.8,
        transports: ['websocket'],
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
        socket.close();
        socket.disconnect();
      }
    },[])

     // Update the server URL and namespace
     let width  =600;
     let height = 300;
     let paddleHeight = ((200 * height) / 1080) /2;
  const [room, setRoom] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isStart,setIsStart] = useState(false);
  const [pos,setPos] = useState("");
  const [chat,setChat] = useState([]);
  const [end,setEnd] = useState(false);
  const [players,setPlayers] = useState([]);
  const [player1,setPlayer1] = useState("player1");
  const [player2,setPlayer2] = useState("player2");
  const [winner,setWinner]  =useState({});
  const dispatch = useDispatch();

  async function fetchUser() 
  {
    fetch(`${ip}:7000/users/${user.id_42}`)
    .then(response=> response.json())
    .then(data=>dispatch(setUser(data)))
    .catch(error=>{console.log(error);
    })
  }
  useEffect(()=>{
    console.log("wiinnn");
    
  },[winner])

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
        
        
    });

    socket.on('playerinfo',(data,data1)=>{
      
      console.log("sddsddsdsdsdsd",data,data1);
      setPlayer1(data.displayname);
      setPlayer2(data1.displayname);
      
    });

    socket.on('room', (code) => {
        
        console.log("room sdgddfdggrs");
        //console.log("ssssssssssssssssssss",data);

        // if(data == user.id)
        //   setPos("left");
        // else
        //   setPos("right");
        if(!isStart)
        {
          socket.emit('start');
          setIsStart(true);
          
        }
    });

    socket.on('stop', (data)=>{
      console.log("stop=>",data);
      fetchUser();
      setWinner(data);
      setIsStart(false);
      setEnd(true);
     // window.location.reload();
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
     console.log("socket closed");
     socket.off('room')
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
  return (
   
    
    isStart  ? (<Game socket={socket} name1={player1} name2={player2}/>):
   (!end ? (<LayoutProvider>
    <div className="h-full text-white p-4 flex flex-col items-center">
     <h1 className="text-4xl mb-8 text-green-500">Matchmaking Game</h1>
   {user && (
      <div className="flex flex-col items-center">
        <p className="text-green-500 mb-5">Connected as: {user.displayname}</p>
        {!room && (
          <div className="flex flex-col items-center">
            <button
              onClick={joinQueue}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-300 transform hover:scale-105"
            >
              Join Queue
            </button>
          </div>
        )}
      </div>
    
   )}
 </div>
    </LayoutProvider>
 ) : <> <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Game Over</h1>
      <img
        src={winner.avatarurl}// Replace with your game over image path
        alt="Game Over"
        className="mb-8"
      />
      <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Winner:  {winner.displayname}
      </p>
    </div></>)
  );
};

export default MatchmakingGame;