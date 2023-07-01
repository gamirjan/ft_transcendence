import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from '../Channels/Channel.entity'
import { User } from '../Users/user.entity';
import { Directmessage } from './DirectMessage.entity';
import { DirectMessagesController } from './DirectMessages.controller';
import { DirectMessagesService } from './DirectMessages.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel, Directmessage])],
  controllers: [DirectMessagesController],
  providers: [DirectMessagesService],
  exports: [DirectMessagesService]
})
export class DirectMessagesModule {}
