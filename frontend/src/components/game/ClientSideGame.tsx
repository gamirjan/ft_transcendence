import React, { useEffect, useRef } from 'react';

const Pong = ({
  username,
  player,
  opp_username,
  ball,
  status
}: {
  username: string;
  player: number;
  opp_username: string;
  ball: number[];
  status: any;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const game = {
      player: player,
      self: { username: username, score: 0, pos: 50 },
      opp: { username: opp_username, score: 0, pos: 50 },
      ball: ball
    };

    const player_velocity = 3;

    const clear = () => {
      ctx.fillStyle = 'black';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const update = () => {
      clear();
      ctx.font = '32px monospace';
      ctx.textAlign = 'center';
      if (game.player === 1) {
        ctx.fillStyle = '#0000ff';
        ctx.fillText(
          `${game.self.username}: ${game.self.score}`,
          canvas.width / 4,
          50
        );
        ctx.fillRect(
          0.05 * canvas.width,
          ((game.self.pos - 10) / 100) * canvas.height,
          0.01 * canvas.width,
          0.2 * canvas.height
        );
        ctx.fillStyle = '#ff0000';
        ctx.fillText(
          `${game.opp.username}: ${game.opp.score}`,
          (3 * canvas.width) / 4,
          50
        );
        ctx.fillRect(
          0.95 * canvas.width,
          ((game.opp.pos - 10) / 100) * canvas.height,
          0.01 * canvas.width,
          0.2 * canvas.height
        );
      } else {
        ctx.fillStyle = '#ff0000';
        ctx.fillText(
          `${game.opp.username}: ${game.opp.score}`,
          canvas.width / 4,
          50
        );
        ctx.fillRect(
          0.05 * canvas.width,
          ((game.opp.pos - 10) / 100) * canvas.height,
          0.01 * canvas.width,
          0.2 * canvas.height
        );

        ctx.fillStyle = '#0000ff';
        ctx.fillText(
          `${game.self.username}: ${game.self.score}`,
          (3 * canvas.width) / 4,
          50
        );
        ctx.fillRect(
          0.95 * canvas.width,
          ((game.self.pos - 10) / 100) * canvas.height,
          0.01 * canvas.width,
          0.2 * canvas.height
        );
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(
        (game.ball[0] / 100) * canvas.width,
        (game.ball[1] / 100) * canvas.height,
        0.02 * canvas.height,
        0.02 * canvas.height
      );
    };

    const upSelf = () => {
      if (game.self.pos > 10) game.self.pos -= 3;
    };

    const downSelf = () => {
      if (game.self.pos < 90) game.self.pos += 3;
    };

    const upOpp = () => {
      if (game.opp.pos > 10) game.opp.pos -= 3;
    };

    const downOpp = () => {
      if (game.opp.pos < 90) game.opp.pos += 3;
    };

    // Add event listeners for keyboard controls

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        upSelf();
      } else if (event.key === 'ArrowDown') {
        downSelf();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        // Handle key release if needed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up event listeners when component is unmounted

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} id="drawing-canvas" width="800" height="600"></canvas>;
};

export default Pong;
