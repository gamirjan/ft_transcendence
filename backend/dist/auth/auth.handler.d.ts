export declare function googleOauthHandler(req: any, res: Response): Promise<void>;
export declare function getGoogleOauthTokens({ code }: {
    code: string;
}): Promise<any>;
