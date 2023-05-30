import { Repository } from 'typeorm';
import { UserFriend } from './UserFriend.entity';
import { User } from '../Users/user.entity';
export declare class UserFriendService {
    private userRepository;
    private friendRepository;
    constructor(userRepository: Repository<User>, friendRepository: Repository<UserFriend>);
    findAll(userId: number): Promise<User[]>;
    create(friend: User): Promise<User>;
    remove(userId: number, friendId: number): Promise<void>;
}
