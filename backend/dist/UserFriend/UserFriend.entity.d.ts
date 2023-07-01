import { User } from "../Users/user.entity";
export declare class UserFriend {
    id: number;
    userid: number | null;
    friendid: number | null;
    friend: User;
    user: User;
}
