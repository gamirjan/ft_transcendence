import { WebSocketGateway } from '@nestjs/websockets';
import { SubscribeMessage } from '@nestjs/websockets';
import { MessageBody } from '@nestjs/websockets';

@WebSocketGateway(3000, { namespace: 'events' })
export class ChatServer {
    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
        console.log("socket");
      return data;
    }




}