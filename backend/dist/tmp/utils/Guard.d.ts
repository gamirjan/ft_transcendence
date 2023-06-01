import { ExecutionContext } from "@nestjs/common";
declare const GoogleGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleGuard extends GoogleGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
