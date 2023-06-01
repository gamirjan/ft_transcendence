import { Repository } from 'typeorm';
import { User } from '../Users/user.entity';
import { CreateUserDto } from './addUser.dto';
export declare class AddUsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
}
