import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mutelist } from './MuteList.entity';
import { Channel } from '../Channels/Channel.entity';
import { ChannelUser } from '../ChannelUsers/ChannelUser.entity';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { ForbiddenException, BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../Users/user.entity';

@Injectable()
export class MuteListService {
  constructor(
    @InjectRepository(Mutelist)
    private muteListRepository: Repository<Mutelist>,
    @InjectRepository(ChannelUser)
    private channelUsersRepository: Repository<ChannelUser>,
    @InjectRepository(ChannelAdmin)
    private channelAdminsRepository: Repository<ChannelAdmin>,
    @InjectRepository(Channel)
    private channelsRepository: Repository<Channel>
  ) {}

  async GetMutedUsers(channelid: number): Promise<User[]> {
    return (await this.muteListRepository.find({ where: { channelid: channelid }, relations: ['user'] })).map(m => m.user);
  }

  async CheckIfUserIsMuted(channelid: number, userid: number): Promise<boolean> {
    return await this.muteListRepository.exist({ where: { channelid: channelid, userid: userid } });
  }

  async MuteUserInChannel(callinguserid: number, channelid: number, userid: number): Promise<Mutelist> {
    await this.checkPermissions(callinguserid, channelid, userid);
    const mutedUser = new Mutelist();
    mutedUser.channelid = channelid;
    mutedUser.userid = userid;
    mutedUser.muteddate = new Date();
    return this.muteListRepository.save(mutedUser);
  }

  async UnMuteUserInChannel(callinguserid: number, channelid: number, userid: number): Promise<Mutelist> {
    await this.checkPermissions(callinguserid, channelid, userid);
    const mutedUser = await this.muteListRepository.findOne({ where: { channelid: channelid, userid: userid } });
    if (!mutedUser)
    {
        throw new BadRequestException('User is not muted');
    }
    return this.muteListRepository.remove(mutedUser);
  }

  private async checkPermissions(callinguserid: number, channelid: number, userid: number): Promise<boolean> {
    var ownerid = (await this.channelsRepository.findOne({ relations: ['owner'], where: { id: channelid } })).owner.id
    var admin = await this.channelAdminsRepository.findOne({ where: { channelid: channelid, adminid: callinguserid } });
    if (!admin && ownerid != callinguserid)
    {
      throw new ForbiddenException('You do not have access to mute users in this channel.');
    }

    var isAdminMuted = await this.channelAdminsRepository.findOne({ where: { channelid: channelid, adminid: userid } });
    if (isAdminMuted && ownerid != callinguserid)
    {
        throw new ForbiddenException('Only channel owner can mute admins');
    }

    var user = await this.channelUsersRepository.findOne({ where: { channelid: channelid, userid: userid } });
    if (!user && !isAdminMuted)
    {
        throw new BadRequestException('User is not in this channel');
    }
    return true;
  }
}
