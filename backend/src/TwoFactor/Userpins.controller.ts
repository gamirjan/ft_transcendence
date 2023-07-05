import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserPinsService } from './Userpins.service';

@Controller('twofactor')
export class UserPinsController {
  constructor(private readonly userPinsService: UserPinsService) {}

  @Post('set')
  async SetUserPin(@Body() payload: { userid: number, pin: string }, @Res() res): Promise<void> {
    const { userid, pin } = payload;
    return res.send(await this.userPinsService.SetPin(userid, pin));
  }

  @Post('change')
  async ChangeUserPin(@Body() payload: { userid: number, oldpin: string, newpin: string }, @Res() res): Promise<void> {
    const { userid, oldpin, newpin } = payload;
    return res.send(await this.userPinsService.ChangePin(userid, oldpin, newpin));
  }

  @Post('remove')
  async DeleteUserPin(@Body() payload: { userid: number, pin: string }, @Res() res): Promise<void> {
    const { userid, pin } = payload;
    return res.send(await this.userPinsService.DeletePin(userid, pin));
  }

  @Post('check')
  async CheckUserPin(@Body() payload: { userid: number, pin: string }, @Res() res): Promise<object> {
    const { userid, pin } = payload;
    return res.send(await this.userPinsService.CheckPin(userid, pin));
  }
}
