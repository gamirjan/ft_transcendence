import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("game")
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get("/hello")
  // hello(@Req() request: Request): string {
  //   return 'hello';//this.appService.getHello();
  // }  
  @Post()
  create(@Body() userData: string): string {
    console.log(userData);
    return `Post request called with param #${userData}.`;
  }
  @Get()
  gameGet(): string {
    return `Get request.`;
  }
  @Get("/login")
  login(): string {
    return this.appService.getHello();
  }
}
