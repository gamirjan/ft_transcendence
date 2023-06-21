import { User } from '../Users/user.entity'

export class CreateGameDto {
    user1: User;
    user2: User;
    user1Score: number;
    user2Score: number
}  