import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChannelAdminsController } from './ChannelAdmin.controller';
import { ChannelAdminsService } from './ChannelAdmins.service';
import { ChannelAdmin } from './ChannelAdmin.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChannelAdmin])],
    controllers: [ChannelAdminsController],
    providers: [ChannelAdminsService],
    exports: [ChannelAdminsService]
})
export class ChannelAdminsModule {}