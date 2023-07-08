import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import IGameOptions from '@/models/IGameOptions';
// import { Pong } from '@/plugins/pong.ts';

const Game = () => {
const [canvas, setCanvas] = useState(null);
const [pong, setPong] = useState(null);
const [endDialog, setEndDialog] = useState(false);
const [winner, setWinner] = useState('');
const [input, setInput] = useState([]);
const [mapColor, setMapColor] = useState('#121212');
const me = useSelector(state => state.user);
const gameSock = useSelector(state => state.gameSock);
const options = useSelector(state => state.gameOptions);
const dispatch = useDispatch();
const history = useNavigate();

const leaveRoom = () => {
setEndDialog(false);
gameSock.disconnect();
history("/main",{replace:true})
};

const handleMouseMove = event => {
if (!pong) return;
const y = event.pageY;
if (y < window.pageYOffset + canvas.getBoundingClientRect().top) return;
if (y > canvas.clientHeight + window.pageYOffset + canvas.getBoundingClientRect().top) return;
const tray = (event.pageY - window.pageYOffset - canvas.getBoundingClientRect().top) / canvas.clientHeight;
pong.updateTray(me, tray);
gameSock.emit('tray', tray);
};

const changeColor = colorId => {
if (colorId === 0)
setMapColor('#121212');
if (colorId === 1)
setMapColor('#040a80');
if (colorId === 2)
setMapColor('#db9c14');
};

useEffect(() => {
dispatch({ type: 'CLEAR_TOAST' });
gameSock.off('ready');
gameSock.on('ready', options => {
if (pong) {
pong.options = options;
changeColor(options.input.plan);
}
});


const handleBall = ball => pong.updateBall(ball.x, ball.y);
const handleScore = scores => pong.updateScore(scores);
const handleTray = (player, tray) => pong.updateTray(player, tray);
const handleStop = user => {
  setWinner(user.username);
  pong.draw();
  document.removeEventListener('mousemove', handleMouseMove);
  setPong(null);
  setEndDialog(true);
  gameSock.disconnect();
};
const handleDisconnect = () => {
  dispatch({ type: 'SET_GAME_ROOM', payload: '' });
  gameSock.disconnect();
};

gameSock.on('ball', handleBall);
gameSock.on('score', handleScore);
gameSock.on('tray', handleTray);
gameSock.on('stop', handleStop);
gameSock.on('disconnect', handleDisconnect);

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
    setPong(null);
  }
  gameSock.disconnect();
};
}, []);

useEffect(() => {
if (!canvas) return;
setInput(options.input);
changeColor(input.plan);

if (input.mode === 1) {
  options.ball.speed = 100;
  options.ball.radius = 35;
}
if (input.mode === 2) {
  options.tray.height = 100;
  options.tray.width = 30;
}

const newPong = new Pong(canvas, options, me.id, useSelector(state => state.usersInGame));
setPong(newPong);
document.addEventListener('mousemove', handleMouseMove);

return () => {
  document.removeEventListener('mousemove', handleMouseMove);
};
}, [canvas]);

useEffect(() => {
setCanvas(document.getElementById('pong'));
}, []);

return (
<div>

    <canvas style={{ 'background-color': mapColor }} class="mx-5 my-5" id="pong"></canvas>
    

</div>
);
};

export default Game;

// CSS Styles

