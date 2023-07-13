import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelUser } from './ChannelUser.entity';
import { User } from '../Users/user.entity';
import { ChannelUserModel } from './ChannelUserModel';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { BadRequestException, ForbiddenException } from '@nestjs/common/exceptions';
import { Channel } from '../Channels/Channel.entity';
import { ChannelsService } from '../Channels/Channels.service';

@Injectable()
export class ChannelUsersService {
  constructor(
    @InjectRepository(ChannelUser)
    private channelUsersRepository: Repository<ChannelUser>,
    @InjectRepository(ChannelAdmin)
    private channelAdminsRepository: Repository<ChannelAdmin>,
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>,
    private readonly channelsService: ChannelsService
  ) {}

  async getChannelUsers(channelid: number): Promise<ChannelUserModel[]> {
    var channelusers = await this.channelUsersRepository.find({ relations: ['user'], where: { channelid: channelid } });
    console.log(channelusers);
    return channelusers.map((cu) => ({
      id: cu.id,
      channelid: cu.channelid,
      user: cu.user
    }));
  }

  async addUser(callinguserid: number, channelid: number, userid: number): Promise<ChannelUser> {
    if (!callinguserid || !channelid || !userid)
    {
      throw new BadRequestException("Invalid parameters");
    }
    var ownerid = (await this.channelsRepository.findOne({ relations: ['owner'], where: { id: channelid } })).owner.id
    var admin = await this.channelAdminsRepository.findOne({ where: { channelid: channelid, adminid: callinguserid } });
    if (!admin && ownerid != callinguserid)
    {
      throw new ForbiddenException('You do not have access to add users in this channel.');
    }
    var allUsers = await this.channelsService.getChannelUsers(channelid);
    if (allUsers.find(cu => cu.user.id == userid))
    {
      throw new BadRequestException("User is already in channel");
    }
    const channelUser = new ChannelUser();
    channelUser.channelid = channelid;
    channelUser.userid = userid;
    return this.channelUsersRepository.save(channelUser);
  }

  async removeUser(channeluserid: number, userid: number): Promise<void> {
    var channel = (await this.channelUsersRepository.findOne({ relations: ['channel'], where: { id: channeluserid } })).channel;
    var ownerid = (await this.channelsRepository.findOne({ relations: ['owner'], where: { id: channel.id } })).owner.id
    var admin = await this.channelAdminsRepository.findOne({ where: { channelid: channel.id, adminid: userid } });
    if (!admin && ownerid != userid)
    {
      throw new ForbiddenException('You do not have access to kick users from this channel.');
    }
    await this.channelUsersRepository.delete({ id: channeluserid });
  }
}
