import { User } from '../Users/user.entity'
import { Channel } from './Channel.entity';

export class UserJoinedChannelDto {
    channel: Channel
    role: ChannelRole
} 

export enum ChannelRole {
    OWNER,
    ADMIN,
    USER
}