import { User } from '../Users/user.entity'
import { ChannelType } from './Channel.entity'

export class CreateChannelDto {
    channelType: ChannelType;
    channelName: string;
    owner: User;
}  