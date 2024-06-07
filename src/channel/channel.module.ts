import { Module } from '@nestjs/common';
import { ChannelRepository } from './channel.repository';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Subscription } from './subscription.entity';

@Module({
    imports: [],
    controllers: [ChannelController],
    exports: [ChannelService],
    providers: [ChannelService, ChannelRepository],
})
export class ChannelModule {}
