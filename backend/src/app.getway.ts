import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Game } from './Game'; // Make sure you have the Game class implementation in the 'Game.ts' file

const HERTZ = 30;
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users: Record<string, User> = {};
  matchmaking: string[] = [];
  games: Record<string, Game> = {};

  @SubscribeMessage('set-username')
  setUsername(client: Socket, username: string, callback: (valid: boolean) => void) {
    // Implement the set-username logic as in the original code
  }

  @SubscribeMessage('get-ping')
  getPing(client: Socket, callback: (ping: boolean) => void) {
    callback(true);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket) {
    // Implement the disconnect logic as in the original code
  }

  handleConnection(client: Socket) {
    // Implement the connection logic as in the original code
  }

  matchMaker(new_player: string) {
    // Implement the matchMaker logic as in the original code
  }

  // Handle interval for game updates
  afterInit() {
    setInterval(() => {
      for (const key in this.games) {
        const game = this.games[key];
        game.update();
        const data = {
          1: {
            score: game.players[game.player1].score,
            pos: game.players[game.player1].pos,
          },
          2: {
            score: game.players[game.player2].score,
            pos: game.players[game.player2].pos,
          },
          ball: game.ball,
        };
        this.server.to(this.users[game.player2].socket.id).emit('game-data', {
          score: data[2].score,
          opp_score: data[1].score,
          opp_pos: data[1].pos,
          ball: data.ball,
        });
        this.server.to(this.users[game.player1].socket.id).emit('game-data', {
          score: data[1].score,
          opp_score: data[2].score,
          opp_pos: data[2].pos,
          ball: data.ball,
        });
      }
    }, (1 / HERTZ) * 1000);
  }
}
