import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelUser } from './ChannelUser.entity';

@Injectable()
export class ChannelUsersService {
  constructor(
    @InjectRepository(ChannelUser)
    private channelUsersRepository: Repository<ChannelUser>
  ) {}

  async addUser(channelid: number, userid: number): Promise<ChannelUser> {
    const channelUser = new ChannelUser();
    channelUser.channelid = channelid;
    channelUser.userid = userid;
    return this.channelUsersRepository.save(channelUser);
  }
}
