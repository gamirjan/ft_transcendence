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
  async getChannelById(@Param('id') id: number, @Res() res): Promise<Channel> {
    return res.send(await this.channelService.getChannelById(id));
  }

  @Get('all')
  async getAllChannels(@Res() res): Promise<Channel[]> {
    return res.send(await this.channelService.getAllChannels());
  }
  
  @Get('owner/:id')
  async getChannelOwner(@Param('id') id: number, @Res() res): Promise<User> {
    return res.send(await this.channelService.getChannelOwner(id));
  }
  
  @Get('admins/:id')
  async getChannelAdmins(@Param('id') id: number, @Res() res): Promise<User[]> {
    return res.send(await this.channelService.getChannelAdmins(id));
  }
  
  @Get('users/:id')
  async getChannelUsersById(@Param('id') id: number, @Res() res): Promise<User[]> {
    return res.send(await this.channelService.getChannelUsers(id));
  }
  
  @Get('user/:userId')
  async getUserChannels(@Param('userId') userId: number, @Res() res): Promise<Channel[]> {
    return res.send(await this.channelService.getUserChannels(userId));
  }
  
  @Post()
  async createChannel(@Body() createChannelDto: CreateChannelDto, @Res() res): Promise<Channel> {
    return res.send(await this.channelService.createChannel(createChannelDto));
  }
  
  @Post('join/public')
  async joinPublicChannel(@Body() joinPublicChannelDto: JoinPublicChannelDto, @Res() res): Promise<ChannelUser> {
    return res.send(await this.channelService.joinUserToPublicChannel(joinPublicChannelDto));
  }
  
  @Post('join/password')
  async joinProtectedChannel(@Body() joinProtectedChannelDto: JoinProtectedChannelDto, @Res() res): Promise<ChannelUser> {
    return res.send(await this.channelService.joinUserToProtectedChannel(joinProtectedChannelDto));
  }
  
  @Delete(':id')
  async deleteChannel(@Param('id') id: number, @Res() res): Promise<void> {
    return res.send(await this.channelService.deleteChannel(id));
  }  
}