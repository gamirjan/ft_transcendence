import { User } from "../Users/user.entity";

export interface ChannelUserModel {
    id: number;
    channelid: number,
    user: User
}