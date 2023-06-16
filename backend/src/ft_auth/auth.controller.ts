import { Controller,Post, Get, Param, Req, UseGuards,Res } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';
import { googleOauthHandler } from './auth.handler';

@Controller('auth')
export class Ft_AuthController {
  @Post('42/login')
  async handleLogin(@Req() req:Request, @Res() res:Response) 
  {
      try {
        console.log(req.body);
        
        // Process your request and create the response object
        const responseObject = {
          message: 'Login successful',
          data: req.body,
        };

        // Send the response object back to the client
        return res.status(200).json(responseObject);
      } catch (error) {
        // Handle any errors that occur during the processing
        // and send an error response back to the client
        return res.status(500).json({ error: 'Internal server error' });
      }
  }
    //@UseGuards(GoogleAuthGuard)
  

  // api/auth/google/redirect
  @Get('42/redirect')
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
