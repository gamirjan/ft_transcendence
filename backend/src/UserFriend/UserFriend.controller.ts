import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserFriend } from './UserFriend.entity';
import { UserFriendService } from './UserFriend.service'; 
import { UserFriendModel } from './UserFriendModel';

@Controller('friends')
export class FriendController {
  constructor(private friendService: UserFriendService) {}

  @Get(':userId')
  async findAll(@Param('userId') userId: number): Promise<UserFriendModel[]> {
    return await this.friendService.getUserFriends(userId);
  }

  @Post()
  async addFriend(@Body() payload: { userid: number, friendid: number }): Promise<UserFriend> {
    const { userid, friendid } = payload;
    return this.friendService.addFriend(userid, friendid);
  }

  @Delete(':userFriendId')
  async remove(@Param('userFriendId') userFriendId: number): Promise<void> {
    return this.friendService.removeFriend(userFriendId);
  }
}