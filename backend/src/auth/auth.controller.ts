import { Controller, Get, Param, Req, UseGuards,Res } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import { googleOauthHandler } from './auth.handler';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  handleLogin() {
    return { msg: 'Google Authentication' };
    //@UseGuards(GoogleAuthGuard)
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  handleRedirect(@Req() req ,@Res() res) {
    googleOauthHandler(req,res)
    // console.log("request :",req.query);
    
    return { msg: 'OK' };
    //@UseGuards(GoogleAuthGuard)
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
