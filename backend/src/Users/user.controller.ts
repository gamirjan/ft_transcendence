import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { UserFriendService } from 'dist/UserFriend/UserFriend.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    console.log("/user request");
    
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findone(@Param('id') userId: number): Promise<User> {
  console.log("/user/:id requset");
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`User with id '${userId}' not found`);
    }
  }

  @Get('byName/:displayName')
  async findByDisplayName(@Param('displayName') displayName: string): Promise<User> {
    const user = await this.usersService.findOneByDisplayName(displayName);
    if (!user) {
      throw new NotFoundException(`User with displayName '${displayName}' not found`);
    }
    return user;
  }
}