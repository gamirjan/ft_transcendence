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

      async getUserFriends(userId: number): Promise<User[]> {
        const user = await this.userRepository.findOne({ relations: ['friends'], where: { id: userId }});
        console.log(user.friends);
        return user.friends.map(friend => friend.friend);
      }

      async addFriend(userid: number, friendid: number): Promise<UserFriend> {
        console.log(userid);
        console.log(friendid);
        const userFriend = new UserFriend();
        userFriend.user = await this.userRepository.findOne({ where: { id: userid } });
        userFriend.friend = await this.userRepository.findOne({ where: { id: friendid } });
        return this.friendRepository.save(userFriend);
      }
    
      async removeFriend(userFriendId: number): Promise<void> {
        await this.friendRepository.delete({ id: userFriendId });
      }
}