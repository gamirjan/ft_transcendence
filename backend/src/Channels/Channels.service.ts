import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channel } from './Channel.entity';
import { CreateChannelDto } from './CreateChannelDto';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async getChannelById(id: number): Promise<Channel> {
    return this.channelRepository.findOne({ where: { id: id } });
  }

  async getUserChannels(userId: number): Promise<Channel[]> {
    return this.channelRepository.find({ where: { owner: { id: userId } } });
  }

  async createChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    const channel = new Channel();
    channel.channeltype = createChannelDto.channelType;
    channel.channelname = createChannelDto.channelName;
    channel.owner = createChannelDto.owner;
    return this.channelRepository.save(channel);
  }

  async deleteChannel(id: number): Promise<void> {
    await this.channelRepository.delete(id);
  }
}
