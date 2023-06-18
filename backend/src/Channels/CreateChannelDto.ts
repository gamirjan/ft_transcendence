import { User } from '../Users/user.entity'

export class CreateChannelDto {
    channelType: "1" | "2" | "3";
    channelName: string;
    owner: User;
}  