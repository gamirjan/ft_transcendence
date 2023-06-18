import { User } from "../Users/user.entity";

export interface ChannelAdminModel {
    id: number;
    channelid: number,
    admin: User
}