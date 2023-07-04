import { v4 as uuidv4 } from 'uuid';

export class Game {
  private ball_vel: number = 0.5;
  public id: string;
  public player1: string;
  public player2: string;
  public players: { [id: string]: { name: string; pos: number; score: number } };
  public ball: [number, number];
  public ball_velocity: [number, number];

  constructor(id: string, username: string, id2: string, username2: string) {
    this.id = uuidv4();
    this.player1 = id;
    this.player2 = id2;
    this.players = {
      [id]: { name: username.toString(), pos: 50, score: 0 },
      [id2]: { name: username.toString(), pos: 50, score: 0 },
    };
    this.ball = [20, 50];
    this.ball_velocity = [MIN_SPEED, 0];
  }

  //Updates game_state and calculates ball position and velocity
  update() {
    this.ball[0] += this.ball_velocity[0];
    this.ball[1] += this.ball_velocity[1];
    if (this.ball[0] >= 100) {
      this.players[this.player1].score++;
      this.reset(1);
    } else if (this.ball[0] <= 0) {
      this.players[this.player2].score++;
      this.reset(2);
    }

    if (this.ball[1] >= 100) {
      this.ball_velocity[1] *= -1;
      this.ball[1] = 99;
    } else if (this.ball[1] <= 0) {
      this.ball_velocity[1] *= -1;
      this.ball[1] = 1;
    }

    //Ugly conditionals, but eh not familiar with javascript syntactically and it works
    if (
      this.ball[1] < this.players[this.player2].pos + 10 &&
      this.ball[1] + 2 > this.players[this.player2].pos - 10 &&
      this.ball[0] > 94 &&
      this.ball[0] < 98
    ) {
      this.ball[0] = 94;
      var relativeIntersectY = this.players[this.player2].pos - this.ball[1] - 1;
      var normalizedRelativeIntersectionY = relativeIntersectY / 10;
      this.ball_velocity[0] = -((1 - Math.abs(normalizedRelativeIntersectionY)) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED);
      this.ball_velocity[1] = -normalizedRelativeIntersectionY;
    } else if (
      this.ball[1] < this.players[this.player1].pos + 10 &&
      this.ball[1] + 2 > this.players[this.player1].pos - 10 &&
      this.ball[0] < 6 &&
      this.ball[0] > 2
    ) {
      this.ball[0] = 6;
      var relativeIntersectY = this.players[this.player1].pos - this.ball[1] - 1;
      var normalizedRelativeIntersectionY = relativeIntersectY / 10;
      var normalizedRelativeIntersectionY = relativeIntersectY / 10;
      this.ball_velocity[0] = (1 - Math.abs(normalizedRelativeIntersectionY)) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
      this.ball_velocity[1] = -normalizedRelativeIntersectionY;
    }
  }

  reset(player: number) {
    if (player == 1) {
      this.ball = [60, 50];
      this.ball_velocity = [-(MIN_SPEED - 1), 0];
    } else {
      this.ball = [40, 50];
      this.ball_velocity = [MIN_SPEED - 1, 0];
    }
  }
}
