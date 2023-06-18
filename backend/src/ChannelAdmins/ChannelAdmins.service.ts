import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelAdmin } from './ChannelAdmin.entity';
import { ChannelAdminModel } from './ChannelAdminModel';

@Injectable()
export class ChannelAdminsService {
  constructor(
    @InjectRepository(ChannelAdmin)
    private channelAdminsRepository: Repository<ChannelAdmin>
  ) {}

  async getChannelAdmins(channelid: number): Promise<ChannelAdminModel[]> {
    var channeladmins = await this.channelAdminsRepository.find({ relations: ['admin'], where: { channelid: channelid } });
    console.log(channeladmins);
    return channeladmins.map((ca) => ({
      id: ca.id,
      channelid: ca.channelid,
      admin: ca.admin
    }));
  }

  async addAdmin(channelid: number, adminid: number): Promise<ChannelAdmin> {
    const channelAdmin = new ChannelAdmin();
    channelAdmin.channelid = channelid;
    channelAdmin.adminid = adminid;
    return this.channelAdminsRepository.save(channelAdmin);
  }

  async removeAdmin(channeladminid: number): Promise<void> {
    await this.channelAdminsRepository.delete({ id: channeladminid });
  }
}
