import { User } from '../Users/user.entity'

export class AddDirectMessageDto {
    user1: User;
    user2: User;
    message: string
}  