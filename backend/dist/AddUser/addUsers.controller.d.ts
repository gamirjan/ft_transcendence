import { CreateUserDto } from './addUser.dto';
import { AddUsersService } from './addUser.service';
export declare class AddUsersController {
    private readonly usersService;
    constructor(usersService: AddUsersService);
    create(createUserDto: CreateUserDto): Promise<import("../Users/user.entity").User>;
}
