import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './Channel.entity'
import { ChannelsController } from './Channels.controller';
import { ChannelsService } from './Channels.service';
import { User } from '../Users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel])],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService]
})
export class ChannelsModule {}
