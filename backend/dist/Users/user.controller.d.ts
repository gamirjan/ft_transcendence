import { UsersService } from './user.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(res: any): Promise<User[]>;
    findone(userId: number, res: any): Promise<User>;
    findByDisplayName(displayName: string, res: any): Promise<User>;
}
