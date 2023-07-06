import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserPinsService } from './Userpins.service';

@Controller('twofactor')
export class UserPinsController {
  constructor(private readonly userPinsService: UserPinsService) {}

  @Post('enable')
  async EnableTF(@Body() payload: { userid: number }, @Res() res): Promise<void> {
    const { userid } = payload;
    return res.send(await this.userPinsService.EnableTF(userid));
  }

  @Post('disable')
  async DisableTF(@Body() payload: { userid: number }, @Res() res): Promise<void> {
    const { userid } = payload;
    return res.send(await this.userPinsService.DisableTF(userid));
  }

  @Post('check')
  async CheckUserPin(@Body() payload: { userid: number, pin: string }, @Res() res): Promise<object> {
    const { userid, pin } = payload;
    return res.send(await this.userPinsService.CheckPin(userid, pin));
  }
}
