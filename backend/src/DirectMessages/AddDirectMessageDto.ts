import { User } from '../Users/user.entity'

export class AddDirectMessageDto {
    user1: User;
    user2: User;
    id1:number;
    id2:number;
    message: string
}  