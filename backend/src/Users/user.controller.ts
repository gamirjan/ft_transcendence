import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    console.log("/user request");
    
    return this.usersService.findAll();
  }
  @Get('/:id')
  async findone(@Param('id') displayName: string): Promise<User> {
  console.log("/user/:is requset");
      const user = await this.usersService.findOneByDisplayName(displayName);
      if (!user) {
        throw new NotFoundException(`User with displayName '${displayName}' not found`);
      }
      return user;
    }
    
  }

