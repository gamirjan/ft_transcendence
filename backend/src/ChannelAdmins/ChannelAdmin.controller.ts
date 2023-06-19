import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ChannelAdminsService } from './ChannelAdmins.service'; 
import { ChannelAdmin } from './ChannelAdmin.entity';
import { ChannelAdminModel } from './ChannelAdminModel';

@Controller('channeladmins')
export class ChannelAdminsController {
  constructor(private readonly channelAdminsService: ChannelAdminsService) {}

  @Get(':id')
  async getChannelAdmins(@Param('id') id: number): Promise<ChannelAdminModel[]> {
    return this.channelAdminsService.getChannelAdmins(id);
  }

  @Post()
  async addAdminToChannel(@Body() payload: { channelid: number, adminid: number }): Promise<ChannelAdmin> {
    const { channelid, adminid } = payload;
    return this.channelAdminsService.addAdmin(channelid, adminid);
  }

  @Delete(':channeladminid')
  async removeAdminFromChannel(@Param('channeladminid') channeladminid: number): Promise<void> {
    return this.channelAdminsService.removeAdmin(channeladminid)
  }
}