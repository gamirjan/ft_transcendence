import { User } from '../Users/user.entity'
import { Channel } from '../Channels/Channel.entity';

export class AddChannelMessageDto {
    channel: Channel;
    user: User;
    message: string
}  