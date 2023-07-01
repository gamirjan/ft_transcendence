import { Controller,Post, Get, Param, Req, UseGuards,Res } from '@nestjs/common';
import { Request } from 'express';
import { googleOauthHandler } from './auth.handler';
import { UsersService } from '../Users/user.service';
import { AddUsersService } from '../AddUser/addUser.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService, private addUserService: AddUsersService) {}

  @Post('google/login')
  async handleLogin(@Req() req:Request, @Res() res:Response) 
  {
      try {
        console.log(req.body);
        
        // Process your request and create the response object
        const responseObject = {
          message: 'Login successful',
          data: req.body,
        };
        console.log("iddddddd",req.body.params.given_name);
        const is_user = true//await this.userService.findOneByName(req.body.params.given_name);
        
      // await console.log("finddd",await this.userService.findOneByName(req.body.params.given_name));
        // Send the response object back to the client
        return (responseObject);
      } catch (error) {
        // Handle any errors that occur during the processing
        // and send an error response back to the client
        return ({ error: 'Internal server error' });
      }
  }
    //@UseGuards(GoogleAuthGuard)
  

  // api/auth/google/redirect
  @Get('google/redirect')
  handleRedirect(@Req() req ,@Res() res) {
    googleOauthHandler(req,res)
    console.log("done!");
    
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
