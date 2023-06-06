import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ChannelUsersService } from './ChannelUsers.service'; 
import { ChannelUser } from './ChannelUser.entity';

@Controller('channelusers')
export class ChannelUsersController {
  constructor(private readonly channelUsersService: ChannelUsersService) {}

  @Post()
  async addUserToChannel(@Body() payload: { channelid: number, userid: number }): Promise<ChannelUser> {
    const { channelid, userid } = payload;
    return this.channelUsersService.addUser(channelid, userid);
  }
}