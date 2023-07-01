import { UsersService } from './user.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findone(userId: number, res: Response): Promise<User>;
    findByDisplayName(displayName: string): Promise<User>;
}
