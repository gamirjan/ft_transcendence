import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChannelAdminsController } from './ChannelAdmin.controller';
import { ChannelAdminsService } from './ChannelAdmins.service';
import { ChannelAdmin } from './ChannelAdmin.entity';
import { UsersModule } from '../Users/users.module';
import { User } from '../Users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChannelAdmin, User]), UsersModule],
    controllers: [ChannelAdminsController],
    providers: [ChannelAdminsService],
    exports: [ChannelAdminsService]
})
export class ChannelAdminsModule {}