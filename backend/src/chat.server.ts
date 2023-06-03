import { 
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    ConnectedSocket,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection
 } from '@nestjs/websockets';
import { Server } from "socket.io";
import { Socket } from "socket.io";

let sockets = [];
@WebSocketGateway(4000, { 
    cors: {
    origin: ['http://localhost:3000','*']
    }
})

export class ChatServer implements OnGatewayInit, OnGatewayConnection{
    @WebSocketServer()
    server: Server;

    afterInit(server: Server){
      }
    handleConnection(client: Socket){
        console.log('New connection');
        const count = this.server.engine.clientsCount;
        console.log("Connected clients: " + count);
        this.server.emit('participants',count);
    }
    handleDisconnect(client: Socket){
        console.log('Disconnection');
        const count = this.server.engine.clientsCount;
        console.log("Connected clients: " + count);
        this.server.emit('participants',count);
    }
    @SubscribeMessage('online')
    addUser(
        @MessageBody() userid: any,
        @ConnectedSocket() client: Socket,
        ) {
        sockets[userid] = client.id;
    }

    @SubscribeMessage('chat')
    handleChatMassage(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
        ) {
        console.log(data.userid + ': ' + data.msg);     
        // socket.broadcast.emit('message', msg); // to all, but the sender
        // this.server.emit('message',data); // to all, including the sender
        this.server/*to(sockets[data.userid])*/.emit('chat',data); // to all, including the sender
        // client.emit('chat',data);
    }
    @SubscribeMessage('channels')
    handleChannelsMassage(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
        ) {
        console.log('Channellog - Room: ' + data.room + ' | ' + data.username + ': ' + data.msg);     
        // socket.broadcast.emit('message', msg); // to all, but the sender
        // this.server.emit('message',data); // to all, including the sender
        this.server.to(data.room).emit('channels',data); // to all, including the sender
    }
    @SubscribeMessage('room')
    joinRoom(
        @MessageBody() room: string,
        @ConnectedSocket() client: Socket) {
        console.log("Room: " + room);
        client.join(room);
    }
}