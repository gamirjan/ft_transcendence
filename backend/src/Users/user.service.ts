import { Injectable } from '@nestjs/common';
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

  async findOneById(userId: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id_42: userId } });
  }
  
  async findOneByDisplayName(displayName: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { displayname: displayName } });
  }

  async findOneByPKId(userid: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: userid } });
  }

  async updateUserInfo(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
