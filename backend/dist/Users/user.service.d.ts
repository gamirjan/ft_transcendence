import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOneById(userId: number): Promise<User | undefined>;
    findOneByDisplayName(displayName: string): Promise<User | undefined>;
}
