import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Channelmessage } from './ChannelMessage.entity';
import { ChannelMessagesService } from './ChannelMessages.service'; 
import { AddChannelMessageDto } from './AddChannelMessageDto';

@Controller('channelmessages')
export class ChannelMessagesController {
  constructor(private readonly channelMessagesService: ChannelMessagesService) {}

  @Get(':id')
  async getChannelMessages(@Param('id') id: number): Promise<Channelmessage[]> {
    return this.channelMessagesService.getChannelMessages(id);
  }

  @Post()
  async addMessageToChannel(@Body() addChannelMessageDto: AddChannelMessageDto): Promise<Channelmessage> {
    return this.channelMessagesService.addMessageToChannel(addChannelMessageDto);
  }
}