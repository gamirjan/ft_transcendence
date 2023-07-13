import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(userId: number): Promise<User> {
    var user = await this.userRepository.findOne({ where: { id_42: userId } });
    if (!user)
      return null;
    return user;
    throw new NotFoundException("User not found");
  }
  
  async findOneByDisplayName(displayName: string): Promise<User> {
    var user = this.userRepository.findOne({ where: { displayname: displayName } });
    if (!user)
      throw new NotFoundException("User not found");
    return user;
  }

  async findOneByPKId(userid: number): Promise<User> {
    var user = await this.userRepository.findOne({ where: { id: userid } });
    if (!user)
      throw new NotFoundException("User not found");
    return user;
  }

  async updateUserInfo(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
