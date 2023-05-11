// users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Users/user.entity';
import { CreateUserDto } from './addUser.dto';

@Injectable()
export class AddUsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.ID_42 = createUserDto.ID_42;
    user.DisplayName = createUserDto.displayName;
    user.AvatarUrl = createUserDto.avatarUrl;
    user.IsTwoFactorEnabled = createUserDto.isTwoFactorEnabled;
    user.Wins = createUserDto.wins;
    user.Losses = createUserDto.losses;

    return this.userRepository.save(user);
  }
}
