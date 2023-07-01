import { ChannelAdmin } from "../ChannelAdmins/ChannelAdmin.entity";
import { Channelmessage } from "../ChannelMessages/ChannelMessage.entity";
import { Channel } from "../Channels/Channel.entity";
import { ChannelUser } from "../ChannelUsers/ChannelUser.entity";
import { Gamehistory } from "../GameHistory/GameHistory.entity";
import { Mutelist } from "../MuteList/MuteList.entity";
import { UserFriend } from "../UserFriend/UserFriend.entity";
export declare class User {
    id: number;
    id_42: number | null;
    displayname: string | null;
    email: string | null;
    avatarurl: string | null;
    isverified: boolean | null;
    istwofactorenabled: boolean | null;
    wins: number | null;
    losses: number | null;
    channeladmins: ChannelAdmin[];
    channelmessages: Channelmessage[];
    channels: Channel[];
    channelusers: ChannelUser[];
    gamehistories: Gamehistory[];
    gamehistories2: Gamehistory[];
    mutelists: Mutelist[];
    userfriends: UserFriend[];
    userfriends2: UserFriend[];
}
