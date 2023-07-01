import { Response } from "express";
interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    picture: string;
    locale: string;
}
interface GoogleTockenResult {
    access_token: string;
    expire_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}
export declare function findAndUpdate(): Promise<void>;
export declare function getGoogleUser(id_token: any, access_token: any): Promise<GoogleUserResult>;
export declare function googleOauthHandler(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getGoogleOauthTokens({ code }: {
    code: string;
}): Promise<GoogleTockenResult>;
export {};
