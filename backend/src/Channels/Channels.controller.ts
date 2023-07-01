import { Controller, Get, Post, Delete, Param, Body, Res } from '@nestjs/common';
import { Channel } from './Channel.entity';
import { ChannelsService } from './Channels.service'; 
import { CreateChannelDto } from './CreateChannelDto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelService: ChannelsService) {}

  @Get(':id')
  async getChannelById(@Param('id') id: number): Promise<Channel> {
    return this.channelService.getChannelById(id);
  }

  @Get('user/:userId')
  async getUserChannels(@Param('userId') userId: number): Promise<Channel[]> {
    return  this.channelService.getUserChannels(userId);
  }

  @Post()
  async createChannel(@Body() createChannelDto: CreateChannelDto,@Res() res:Response): Promise<Channel> {
    return (this.channelService.createChannel(createChannelDto));
  }

  @Delete(':id')
  async deleteChannel(@Param('id') id: number): Promise<void> {
    return this.channelService.deleteChannel(id);
  }
}