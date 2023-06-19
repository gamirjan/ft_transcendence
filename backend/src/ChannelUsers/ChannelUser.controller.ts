import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ChannelUsersService } from './ChannelUsers.service'; 
import { ChannelUser } from './ChannelUser.entity';
import { User } from '../Users/user.entity';
import { ChannelUserModel } from './ChannelUserModel';

@Controller('channelusers')
export class ChannelUsersController {
  constructor(private readonly channelUsersService: ChannelUsersService) {}

  @Get(':id')
  async getChannelUsers(@Param('id') id: number): Promise<ChannelUserModel[]> {
    return this.channelUsersService.getChannelUsers(id);
  }

  @Post()
  async addUserToChannel(@Body() payload: { channelid: number, userid: number }): Promise<ChannelUser> {
    const { channelid, userid } = payload;
    return this.channelUsersService.addUser(channelid, userid);
  }

  @Delete(':channeluserid')
  async removeUserFromChannel(@Param('channeluserid') channeluserid: number): Promise<void> {
    return this.channelUsersService.removeUser(channeluserid)
  }
}