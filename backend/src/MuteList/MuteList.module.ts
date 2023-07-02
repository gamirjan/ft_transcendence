import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mutelist } from './Mutelist.entity';
import { User } from '../Users/user.entity';
import { MuteListController } from './MuteList.controller';
import { Channel } from '../Channels/Channel.entity';
import { ChannelUser } from '../ChannelUsers/ChannelUser.entity';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { MuteListService } from './MuteList.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel, Mutelist, ChannelAdmin, ChannelUser])],
  controllers: [MuteListController],
  providers: [MuteListService],
  exports: [MuteListService]
})
export class MuteListModule {}
