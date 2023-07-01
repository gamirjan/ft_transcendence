import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ChannelUsersService } from './ChannelUsers.service'; 
import { ChannelUser } from './ChannelUser.entity';
import { User } from '../Users/user.entity';
import { ChannelUserModel } from './ChannelUserModel';

@Controller('channelusers')
export class ChannelUsersController {
  constructor(private readonly channelUsersService: ChannelUsersService) {}

  // todo: join channel by click

  // todo: join channel by password

  @Get(':id')
  async getChannelUsers(@Param('id') id: number): Promise<ChannelUserModel[]> {
    return this.channelUsersService.getChannelUsers(id);
  }

  @Post()
  async addUserToChannel(@Body() payload: { callinguserid: number, channelid: number, userid: number }): Promise<ChannelUser> {
    const { callinguserid, channelid, userid } = payload;
    return this.channelUsersService.addUser(callinguserid, channelid, userid);
  }

  @Delete('/:channeluserid/:userid')
  async removeUserFromChannel(@Param('channeluserid') channeluserid: number, @Param('userid') userid: number): Promise<void> {
    return this.channelUsersService.removeUser(channeluserid, userid)
  }
}