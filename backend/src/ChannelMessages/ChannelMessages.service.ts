import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channelmessage } from './ChannelMessage.entity';
import { AddChannelMessageDto } from './AddChannelMessageDto';
import { Channel } from '../Channels/Channel.entity';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { ChannelUser } from '../ChannelUsers/ChannelUser.entity';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class ChannelMessagesService {
  constructor(
    @InjectRepository(Channelmessage)
    private channelMessagesRepository: Repository<Channelmessage>,
    @InjectRepository(Channel)
    private channelRepository: Repository<Channel>,
    @InjectRepository(ChannelAdmin)
    private channelAdminsRepository: Repository<ChannelAdmin>,
    @InjectRepository(ChannelUser)
    private channelUsersRepository: Repository<ChannelUser>
  ) {}

  async getChannelMessages(id: number): Promise<Channelmessage[]> {
    return this.channelMessagesRepository.find({ relations: ['user'], where: { channel: { id: id } } });
  }

  async addMessageToChannel(addMessageToChannelDto: AddChannelMessageDto): Promise<Channelmessage> {
    var owner = await this.channelRepository.findOne({ where: { owner: { id: addMessageToChannelDto.user.id } } });
    var admin = await this.channelAdminsRepository.findOne({ where: { channelid: addMessageToChannelDto.channel.id, adminid: addMessageToChannelDto.user.id } })
    var user = await this.channelUsersRepository.findOne({ where: { channelid: addMessageToChannelDto.channel.id, userid: addMessageToChannelDto.user.id } })
    if (!owner && !admin && !user)
    {
        throw new ForbiddenException('You do not have access to write message to this channel.');
    }
    const channelmessage = new Channelmessage();
    channelmessage.message = addMessageToChannelDto.message;
    channelmessage.user = addMessageToChannelDto.user;
    channelmessage.channel = addMessageToChannelDto.channel;
    return this.channelMessagesRepository.save(channelmessage);
  }
}