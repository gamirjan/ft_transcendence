import {
  ConnectedSocket,
  MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Socket } from 'socket.io';
  import { Input } from './interfaces/input.interface';
  import { RoomService } from './services/room.service';
  import { Player } from './interfaces/player.interface';
  import { Room } from './interfaces/room.interface';
  import { UsersService } from '../Users/user.service';
  import { Status } from '../enums/status.enum';
import { log } from 'console';
  
  @WebSocketGateway(4000,{
    cors: {
      origin:"*",
    },
    namespace: 'pong',
  })
  export class GameGateway {
    constructor(
      private readonly userService: UsersService,
      private readonly roomService: RoomService,
    ) {}
    @WebSocketServer()
    server: any;
  
    async handleConnection(client: Socket): Promise<any> {
      try
      {
        const user = await this.userService.findOneById(this.roomService.getUserFromSocket(client).id_42);
        if (!user) return client.disconnect();
        
        client.emit('info', { user });
      }
      catch {}
    }
  
    async handleDisconnect(client: Socket): Promise<any> {
      try {
        if (!this.roomService.getUserFromSocket(client)) return;
  
        await this.roomService.removeSocket(client);
        // await this.userService.setStatus(client.data.user.id, Status.ONLINE);
      } catch {}
    }
  
    @SubscribeMessage('queue')
    joinQueue(@ConnectedSocket() client: Socket,@MessageBody() data:any): void {
      
      try {
        
        if (!data) return;
        //console.log(client);
        //console.log(data.data.id);
        
       // console.log("opoooooooooooooooooooooooooooo", client);
        this.roomService.addQueue(client,data);
      } catch {}
    }
  
    @SubscribeMessage('room')
    joinRoom(@ConnectedSocket() client: Socket, code?: string): void {
      try {
        if (!this.roomService.getUserFromSocket(client)) return;
  
        let room: Room = this.roomService.getRoom(code);
        if (!room) room = this.roomService.createRoom(code);
        console.log("room emit",room);
        
        this.roomService.joinRoom(client, room);
      } catch {}
    }
  
    @SubscribeMessage('ready')
    onReady(@ConnectedSocket() client: Socket, input: Input): void {
      try {
        const user = this.roomService.getUserFromSocket(client);
        if (!user) return;
  
        const player: Player = this.roomService.getPlayer(user.id);
        if (!player) return;
  
        this.roomService.ready(player, input);
      } catch {}
    }
  
    @SubscribeMessage('start')
    onStart(@ConnectedSocket() client: Socket): void {
      try {
        
        const user = this.roomService.getUserFromSocket(client);
        if (!user) return;
        console.log("game has been started", user.id);

        const player: Player = this.roomService.getPlayer(user.id);
        if (!player || !player.room) return;
        // console.log("pplplplplll--------------------------------------------------------p");
        
        this.roomService.startCalc(player.room);
      } catch {}
    }
  
    @SubscribeMessage('tray')
    updateTray(@ConnectedSocket() client: Socket, tray: number): void {
      try {
        const user = this.roomService.getUserFromSocket(client);
        if (!user) return;
  
        const player: Player = this.roomService.getPlayer(user.id);
        if (!player) return;
  
        player.tray = tray * player.room.options.display.height;
        RoomService.emit(player.room, 'tray', this.roomService.getUserFromSocket(player.socket).id, tray);
      } catch {}
    }
  }
  