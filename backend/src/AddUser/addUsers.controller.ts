// users.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './addUser.dto';
import { AddUsersService } from './addUser.service';
import { Res } from '@nestjs/common/decorators';

@Controller('users')
export class AddUsersController {
  constructor(private readonly usersService: AddUsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    return res.send(await this.usersService.create(createUserDto));
  }
}
