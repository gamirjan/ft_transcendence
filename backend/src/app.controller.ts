import { Controller, Get, Post, Body, Param,Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as requestIp from 'request-ip';





@Controller("game")
export class AppController {
  constructor(private readonly appService: AppService) {}


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
  @Get("/ip")
  getCurrentIp(@Req() request: Request): string {
    const ip = requestIp.getClientIp(request);
    return ip;
  }
}
/* 
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import * as requestIp from 'request-ip';

@Controller('ip')
export class IpController {
  @Get()
  getCurrentIp(@Req() request: Request): string {
    const ip = requestIp.getClientIp(request);
    return ip;
  }
} */