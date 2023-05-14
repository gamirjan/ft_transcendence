import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { User } from '../Users/user.entity'
import { UserFriend } from './UserFriend.entity';
import { UserFriendService } from './UserFriend.service'; 

@Controller('friends')
export class FriendController {
  constructor(private friendService: UserFriendService) {}

  @Get(':userId')
  async findAll(@Param('userId') userId: number): Promise<User[]> {
    return this.friendService.findAll(userId);
  }

  @Post()
  async create(@Body() friend: UserFriend): Promise<UserFriend> {
    return this.friendService.create(friend);
  }

  @Delete(':userId/:friendId')
  async remove(
    @Param('userId') userId: number,
    @Param('friendId') friendId: number,
  ): Promise<void> {
    return this.friendService.remove(userId, friendId);
  }
}