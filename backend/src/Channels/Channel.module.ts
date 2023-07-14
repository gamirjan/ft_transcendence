import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './Channel.entity'
import { ChannelsController } from './Channels.controller';
import { ChannelsService } from './Channels.service';
import { User } from '../Users/user.entity';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { ChannelUser } from '../ChannelUsers/ChannelUser.entity';
import { Channelmessage } from '../ChannelMessages/ChannelMessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel, ChannelAdmin, ChannelUser, Channelmessage])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService]
})
export class ChannelsModule {}
