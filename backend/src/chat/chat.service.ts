import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Message } from './interfaces/message.interface';

@Injectable()
export class ChatService {
  private users: User[] = [];
  private messages: Message[] = [];

  addUser(socketId: string, username: string) {
    const user: User = {
      socketId,
      username,
    };

    this.users.push(user);

    return user;
  }

  removeUser(socketId: string) {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }

  getUsers() {
    return this.users;
  }

  addMessage(username: string, text: string) {
    const message: Message = {
      username,
      text,
      time: new Date().toLocaleTimeString(),
    };

    this.messages.push(message);

    return message;
  }

  getMessages() {
    return this.messages;
  }
}
