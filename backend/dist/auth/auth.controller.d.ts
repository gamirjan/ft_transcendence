import { Request } from 'express';
import { UsersService } from '../Users/user.service';
import { AddUsersService } from '../AddUser/addUser.service';
export declare class AuthController {
    private userService;
    private addUserService;
    constructor(userService: UsersService, addUserService: AddUsersService);
    handleLogin(req: Request, res: Response): Promise<{
        message: string;
        data: any;
    } | {
        error: string;
    }>;
    handleRedirect(req: any, res: any): {
        msg: string;
    };
    user(request: Request): {
        msg: string;
    };
}
