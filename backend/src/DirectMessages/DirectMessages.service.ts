import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directmessage } from './DirectMessage.entity';
import { AddDirectMessageDto } from './AddDirectMessageDto';
import { User } from '../Users/user.entity';
import { DirectMessageDto } from './DirectMessageDto';

@Injectable()
export class DirectMessagesService {
  constructor(
    @InjectRepository(Directmessage)
    private directMessagesRepository: Repository<Directmessage>,
  ) {}

  async addDirectMessage(addDirectMessageDto: AddDirectMessageDto): Promise<Directmessage> {
    const directmessage = new Directmessage();
    directmessage.message = addDirectMessageDto.message;
    directmessage.user1 = addDirectMessageDto.user1;
    directmessage.user2 = addDirectMessageDto.user2;
    directmessage.publishdate = new Date();
    return this.directMessagesRepository.save(directmessage);
  }

  async getUserAllChats(userid: number): Promise<User[]> {
    var dmusers = (await this.directMessagesRepository.find({ where: [ {user1id: userid}, {user2id: userid } ], relations: ['user1', 'user2'], order: { id: 'DESC' } }));
    const users = dmusers.map(dm => {
      if (dm.user1id == userid)
        return dm.user2;
      else
        return dm.user1;
    });
    return [...new Map(users.map((item) => [item["id"], item])).values()];
  }

  async getChatMessages(user1id: number, user2id: number): Promise<DirectMessageDto[]> {
    return (await this.directMessagesRepository.find({ where: [ { user1id: user1id, user2id: user2id }, { user1id: user2id, user2id: user1id } ], order: { id: 'ASC' } })).map(dm => ({
      senderid: dm.user1id,
      message: dm.message
    }));
  }
}