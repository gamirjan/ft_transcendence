import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChannelUsersController } from './ChannelUser.controller';
import { ChannelUsersService } from './ChannelUsers.service';
import { ChannelUser } from './ChannelUser.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChannelUser])],
    controllers: [ChannelUsersController],
    providers: [ChannelUsersService],
    exports: [ChannelUsersService]
})
export class ChannelUsersModule {}