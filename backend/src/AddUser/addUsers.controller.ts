// users.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './addUser.dto';
import { AddUsersService } from './addUser.service';

@Controller('users')
export class AddUsersController {
  constructor(private readonly usersService: AddUsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
