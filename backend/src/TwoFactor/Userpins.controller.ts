import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserPinsService } from './Userpins.service';

@Controller('twofactor')
export class UserPinsController {
  constructor(private readonly userPinsService: UserPinsService) {}

  @Post('set')
  async MuteUserInChannel(@Body() payload: { userid: number, pin: string }, @Res() res): Promise<void> {
    const { userid, pin } = payload;
    return res.send(await this.userPinsService.SetPin(userid, pin));
  }

  @Post('check')
  async GetMutedUsers(@Body() payload: { userid: number, pin: string }, @Res() res): Promise<object> {
    const { userid, pin } = payload;
    return res.send(await this.userPinsService.CheckPin(userid, pin));
  }
}
