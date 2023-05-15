import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleGuard extends AuthGuard('google')
{
    async canActivate(context: ExecutionContext){
        const activate = (super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest()
        
        await super.logIn(request);
        console.log(activate);
        return activate;
    }
}