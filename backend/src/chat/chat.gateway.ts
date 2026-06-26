import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JoinDto } from './dto/join.dto';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log('Cliente conectado: ', client.id);
  }

  handleDisconnect(client: Socket) {
    this.chatService.removeUser(client.id);
    console.log('Cliente desconectado: ', client.id);

    this.server.emit('users', this.chatService.getUsers());
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: JoinDto, @ConnectedSocket() client: Socket) {
    const user = this.chatService.addUser(client.id, data.username);

    console.log(user);

    this.server.emit('userJoined', user);

    this.server.emit('users', this.chatService.getUsers());
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: MessageDto) {
    const message = this.chatService.addMessage(data.username, data.text);

    this.server.emit('newMessage', message);
  }
}
