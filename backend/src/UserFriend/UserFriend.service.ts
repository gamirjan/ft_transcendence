import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFriend } from './UserFriend.entity';
import { User } from '../Users/user.entity'; 



@Injectable()
export class UserFriendService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserFriend)
        private friendRepository: Repository<UserFriend>,
      ) {}
    
      async findAll(userId: number): Promise<User[]> {
        const friends = await this.friendRepository
          .createQueryBuilder('friend')
          .innerJoinAndSelect('friend.friend', 'user')
          .where('friend.user.id = :userId', { userId })
          .getMany();
    
        return friends.map((friend) => friend.user);
      }
    
      async create(friend: UserFriend): Promise<UserFriend> {
        return this.friendRepository.save(friend);
      }
    
      async remove(userId: number, friendId: number): Promise<void> {
        await this.friendRepository.delete({ user: { Id: userId }});
      }
}