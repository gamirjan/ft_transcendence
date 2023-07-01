import { Repository } from 'typeorm';
import { UserFriend } from './UserFriend.entity';
import { User } from '../Users/user.entity';
import { UserFriendModel } from './UserFriendModel';
export declare class UserFriendService {
    private userRepository;
    private friendRepository;
    constructor(userRepository: Repository<User>, friendRepository: Repository<UserFriend>);
    getUserFriends(userId: number): Promise<UserFriendModel[]>;
    addFriend(userid: number, friendid: number): Promise<UserFriend>;
    removeFriend(userFriendId: number): Promise<void>;
}
