import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserDetails } from '../utils/types';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validateUser(details: UserDetails): Promise<User>;
    findUser(id: number): Promise<User>;
}
