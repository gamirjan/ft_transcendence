import { UserFriend } from './UserFriend.entity';
import { UserFriendService } from './UserFriend.service';
import { UserFriendModel } from './UserFriendModel';
export declare class FriendController {
    private friendService;
    constructor(friendService: UserFriendService);
    findAll(userId: number, res: any): Promise<UserFriendModel[]>;
    addFriend(payload: {
        userid: number;
        friendid: number;
    }, res: any): Promise<UserFriend>;
    remove(userFriendId: number, res: any): Promise<void>;
}
