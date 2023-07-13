import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChannelUsersController } from './ChannelUser.controller';
import { ChannelUsersService } from './ChannelUsers.service';
import { ChannelUser } from './ChannelUser.entity';
import { ChannelAdmin } from '../ChannelAdmins/ChannelAdmin.entity';
import { Channel } from '../Channels/Channel.entity';
import { ChannelsService } from '../Channels/Channels.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChannelUser, ChannelAdmin, Channel])],
    controllers: [ChannelUsersController],
    providers: [ChannelUsersService, ChannelsService],
    exports: [ChannelUsersService]
})
export class ChannelUsersModule {}