import { Request } from 'express';
export declare class AuthController {
    handleLogin(): {
        msg: string;
    };
    handleRedirect(req: any, res: any): {
        msg: string;
    };
    user(request: Request): {
        msg: string;
    };
}
