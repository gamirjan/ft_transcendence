import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelUser } from './ChannelUser.entity';
import { User } from '../Users/user.entity';
import { ChannelUserModel } from './ChannelUserModel';

@Injectable()
export class ChannelUsersService {
  constructor(
    @InjectRepository(ChannelUser)
    private channelUsersRepository: Repository<ChannelUser>
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

  async addUser(channelid: number, userid: number): Promise<ChannelUser> {
    const channelUser = new ChannelUser();
    channelUser.channelid = channelid;
    channelUser.userid = userid;
    return this.channelUsersRepository.save(channelUser);
  }

  async removeUser(channeluserid: number): Promise<void> {
    await this.channelUsersRepository.delete({ id: channeluserid });
  }
}
