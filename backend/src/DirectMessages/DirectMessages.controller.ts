import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { DirectMessagesService } from './DirectMessages.service';
import { Directmessage } from './DirectMessage.entity';
import { AddDirectMessageDto } from './AddDirectMessageDto';
import { User } from '../Users/user.entity';

@Controller('directmessages')
export class DirectMessagesController {
  constructor(private readonly directMessagesService: DirectMessagesService) {}

  @Post()
  async addDirectMessage(@Body() addDirectMessageDto: AddDirectMessageDto): Promise<Directmessage> {
    return this.directMessagesService.addDirectMessage(addDirectMessageDto);
  }

  @Get('chats/:userid')
  async getUserAllChats(@Param('userid') userid: number): Promise<User[]> {
    return this.directMessagesService.getUserAllChats(userid);
  }
}