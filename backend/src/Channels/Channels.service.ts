import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './Channel.entity';
import { CreateChannelDto } from './CreateChannelDto';
import { In } from 'typeorm';
import { User } from '../Users/user.entity';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { ChannelUser } from '../ChannelUsers/ChannelUser.entity';
import { JoinPublicChannelDto } from './JoinPublicChannelDto';
import { JoinProtectedChannelDto } from './JoinProtectedChannelDto';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { ChannelRole, UserJoinedChannelDto } from './UserJoinedChannelDto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    @InjectRepository(ChannelAdmin)
    private channelAdminsRepository: Repository<ChannelAdmin>,
    @InjectRepository(ChannelUser)
    private channelUsersRepository: Repository<ChannelUser>
  ) {}

  async getAllChannels(): Promise<Channel[]> {
    return this.channelRepository.find({ where: { channeltype: In([1, 2]) } })
  }

  async getChannelUsers(id: number): Promise<User[]> {
    var owner = await this.getChannelOwner(id);
    var admins = await this.getChannelAdmins(id);
    var users = (await this.channelUsersRepository.find({ where: { channelid: id }, relations: ['user'] })).map(cu => cu.user);
    return [owner].concat(admins, users);
  }

  async getChannelOwner(id: number): Promise<User> {
    return (await this.channelRepository.findOne({ where: { id: id }, relations: ['owner'] })).owner;
  }

  async getChannelAdmins(id: number): Promise<User[]> {
    return (await this.channelAdminsRepository.find({ where: { channelid: id }, relations: ['admin'] })).map(a => a.admin);
  } 

  async getChannelById(id: number): Promise<Channel> {
    return this.channelRepository.findOne({ where: { id: id } });
  }

  async getUserChannels(userId: number): Promise<Channel[]> {
    return this.channelRepository.find({ where: { owner: { id: userId } } });
  }

  async getUserJoinedChannels(userId: number): Promise<UserJoinedChannelDto[]> {
    var ownedChannels = (await this.channelRepository.find({ where: { owner: { id: userId } } }))
                                                     .map(c => ({
                                                      role: ChannelRole.OWNER,
                                                      channel: c
                                                    }));
    var adminedChannels = (await this.channelAdminsRepository.find({ where: { adminid: userId }, relations: ['channel'] }))
                                                             .map(ca => ({
                                                              role: ChannelRole.ADMIN,
                                                              channel: ca.channel
                                                             }));
    var regularChannels = (await this.channelUsersRepository.find({ where: { userid: userId }, relations: ['channel'] }))
                                                            .map(cu => ({
                                                              role: ChannelRole.USER,
                                                              channel: cu.channel
                                                            }));
    return ownedChannels.concat(adminedChannels, regularChannels);
  }

  async createChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    if (createChannelDto.channelType == "2" && (createChannelDto.password == null || createChannelDto.password == ''))
    {
      throw new BadRequestException("You must provide a password");
    }
    if (createChannelDto.channelType != "2" && (createChannelDto.password != null && createChannelDto.password != ''))
    {
      throw new BadRequestException("You can't set a password on public or invite-only channels");
    }
    const channel = new Channel();
    channel.channeltype = createChannelDto.channelType;
    channel.channelname = createChannelDto.channelName;
    channel.owner = createChannelDto.owner;
    channel.password = createChannelDto.channelType == "2" ? await bcrypt.hash(createChannelDto.password, 10) : null;
    return await this.channelRepository.save(channel);
  }

  async joinUserToPublicChannel(joinPublicChannelDto: JoinPublicChannelDto): Promise<ChannelUser> {
    const channelUser = new ChannelUser();
    channelUser.userid = joinPublicChannelDto.userid;
    channelUser.channelid = joinPublicChannelDto.channelid;
    return await this.channelUsersRepository.save(channelUser);
  }

  async joinUserToProtectedChannel(joinProtectedChannelDto: JoinProtectedChannelDto): Promise<ChannelUser> {
    const channel = await this.channelRepository.findOne({ where: { id: joinProtectedChannelDto.channelid, channeltype: "2" } });
    if (!channel) {
      throw new NotFoundException('Channel not found');
    }

    const passwordMatched = await bcrypt.compare(joinProtectedChannelDto.password, channel.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect password');
    }

    const channelUser = new ChannelUser();
    channelUser.userid = joinProtectedChannelDto.userid;
    channelUser.channelid = joinProtectedChannelDto.channelid;
    console.log("adding");
    return await this.channelUsersRepository.save(channelUser);
  }

  async deleteChannel(id: number): Promise<void> {
    await this.channelRepository.delete(id);
  }
}
