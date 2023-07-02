import { Controller, Get, Post, Delete, Param, Body, Res } from '@nestjs/common';
import { Channel } from './Channel.entity';
import { ChannelsService } from './Channels.service'; 
import { CreateChannelDto } from './CreateChannelDto';
import { User } from '../Users/user.entity';
import { ChannelUser } from '../ChannelUsers/ChannelUser.entity';
import { JoinPublicChannelDto } from './JoinPublicChannelDto';
import { JoinProtectedChannelDto } from './JoinProtectedChannelDto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelService: ChannelsService) {}

  @Get('get/:id')
  async getChannelById(@Param('id') id: number): Promise<Channel> {
    return this.channelService.getChannelById(id);
  }

  @Get('all')
  async getAllChannels(): Promise<Channel[]> {
    return this.channelService.getAllChannels();
  }

  @Get('owner/:id')
  async getChannelOwner(@Param('id') id: number): Promise<User> {
    return this.channelService.getChannelOwner(id);
  }

  @Get('admins/:id')
  async getChannelAdmins(@Param('id') id: number): Promise<User[]> {
    return this.channelService.getChannelAdmins(id);
  }

  @Get('users/:id')
  async getChannelUsersById(@Param('id') id: number): Promise<User[]> {
    return this.channelService.getChannelUsers(id);
  }

  @Get('user/:userId')
  async getUserChannels(@Param('userId') userId: number): Promise<Channel[]> {
    return  this.channelService.getUserChannels(userId);
  }

  @Post()
  async createChannel(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelService.createChannel(createChannelDto);
  }

  @Post('join/public')
  async joinPublicChannel(@Body() joinPublicChannelDto: JoinPublicChannelDto): Promise<ChannelUser> {
    return this.channelService.joinUserToPublicChannel(joinPublicChannelDto);
  }

  @Post('join/password')
  async joinProtectedChannel(@Body() joinProtectedChannelDto: JoinProtectedChannelDto): Promise<ChannelUser> {
    return this.channelService.joinUserToProtectedChannel(joinProtectedChannelDto);
  }

  @Delete(':id')
  async deleteChannel(@Param('id') id: number): Promise<void> {
    return this.channelService.deleteChannel(id);
  }
}