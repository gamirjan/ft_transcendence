import { User } from '../Users/user.entity';
import { UserFriendService } from './UserFriend.service';
export declare class FriendController {
    private friendService;
    constructor(friendService: UserFriendService);
    findAll(userId: number): Promise<User[]>;
    create(friend: User): Promise<User>;
    remove(userId: number, friendId: number): Promise<void>;
}
