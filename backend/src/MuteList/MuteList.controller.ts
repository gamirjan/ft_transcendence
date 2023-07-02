import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Mutelist } from './MuteList.entity';
import { MuteListService } from './MuteList.service';
import { User } from '../Users/user.entity';

@Controller('mutelist')
export class MuteListController {
  constructor(private readonly muteListService: MuteListService) {}

  @Get(':channelid')
  async GetMutedUsers(@Param('channelid') channelid: number): Promise<User[]> {
    return this.muteListService.GetMutedUsers(channelid);
  }

  @Post('mute')
  async MuteUserInChannel(@Body() payload: { callinguserid: number, channelid: number, userid: number }): Promise<Mutelist> {
    const { callinguserid, channelid, userid } = payload;
    return this.muteListService.MuteUserInChannel(callinguserid, channelid, userid);
  }

  @Get('unmute')
  async UnMuteUserInChannel(@Body() payload: { callinguserid: number, channelid: number, userid: number }): Promise<Mutelist> {
    const { callinguserid, channelid, userid } = payload;
    return this.muteListService.UnMuteUserInChannel(callinguserid, channelid, userid);
  }
}
