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
          .createQueryBuilder('userfriends')
          .innerJoinAndSelect('userfriends.friend', 'user')
          .where('userfriends.userId = :userId', { userId })
          .getMany();
    
        return friends.map((friend) => friend.user);
      }
    
      async create(friend: User): Promise<User> {
        const newFriend = this.userRepository.create(friend);
        return this.userRepository.save(newFriend);
      }
    
      async remove(userId: number, friendId: number): Promise<void> {
        await this.friendRepository.delete({ user: { Id: userId }});
      }
}