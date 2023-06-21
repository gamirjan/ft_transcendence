import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ChannelAdminsService } from './ChannelAdmins.service'; 
import { ChannelAdmin } from './ChannelAdmin.entity';
import { ChannelAdminModel } from './ChannelAdminModel';

@Controller('channeladmins')
export class ChannelAdminsController {
  constructor(private readonly channelAdminsService: ChannelAdminsService) {}

  @Get('/:id/:userid')
  async getChannelAdmins(@Param('id') id: number, @Param('userid') userid: number): Promise<ChannelAdminModel[]> {
    return this.channelAdminsService.getChannelAdmins(id, userid);
  }

  @Post()
  async addAdminToChannel(@Body() payload: { userid: number, channelid: number, adminid: number }): Promise<ChannelAdmin> {
    const { userid, channelid, adminid } = payload;
    return this.channelAdminsService.addAdmin(userid, channelid, adminid);
  }

  @Delete('/:channeladminid/:userid')
  async removeAdminFromChannel(@Param('channeladminid') channeladminid: number, @Param('userid') userid: number): Promise<void> {
    return this.channelAdminsService.removeAdmin(userid, channeladminid)
  }
}