import React, { useEffect, useRef } from 'react';

const PingPongGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    const paddleWidth = 10;
    const paddleHeight = 60;
    const paddleSpeed = 5;
    let paddle1Y = height / 2 - paddleHeight / 2;
    let paddle2Y = height / 2 - paddleHeight / 2;
    let ballX = width / 2;
    let ballY = height / 2;
    let ballSpeedX = 3;
    let ballSpeedY = 3;

    const updateGame = () => {
      // Move the paddles
      const keys = {};
      document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
      });
      document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
      });
      if (keys['w'] && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
      }
      if (keys['s'] && paddle1Y < height - paddleHeight) {
        paddle1Y += paddleSpeed;
      }
      if (keys['ArrowUp'] && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
      }
      if (keys['ArrowDown'] && paddle2Y < height - paddleHeight) {
        paddle2Y += paddleSpeed;
      }

      // Move the ball
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Check for collision with paddles
      if (
        ballX <= paddleWidth &&
        ballY + paddleWidth >= paddle1Y &&
        ballY - paddleWidth <= paddle1Y + paddleHeight
      ) {
        ballSpeedX *= -1;
      }
      if (
        ballX >= width - paddleWidth &&
        ballY + paddleWidth >= paddle2Y &&
        ballY - paddleWidth <= paddle2Y + paddleHeight
      ) {
        ballSpeedX *= -1;
      }

      // Check for collision with walls
      if (ballY <= 0 || ballY >= height - paddleWidth) {
        ballSpeedY *= -1;
      }

      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Draw the paddles
      ctx.fillStyle = 'white';
      ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
      ctx.fillRect(width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, paddleWidth, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();

      // Request the next frame
      requestAnimationFrame(updateGame);
    };

    // Start the game loop
    updateGame();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="border border-white"
      />
    </div>
  );
};

export default PingPongGame;
