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

@WebSocketGateway(4000, { cors: 'http://localhost:3000' })

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
    
    @SubscribeMessage('message')
    handleMassage(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket,
        ) {
        console.log('Chatlog - Room: ' + data.room + ' | ' + data.userid + ': ' + data.msg);     
        // socket.broadcast.emit('message', msg); // to all, but the sender
        // this.server.emit('message',data); // to all, including the sender
        this.server.to(data.room).emit('message',data); // to all, including the sender
    }
    
    @SubscribeMessage('room')
    joinRoom(
        @MessageBody() room: string,
        @ConnectedSocket() client: Socket) {
        console.log("Room: " + room);
        client.join(room);
    }
}