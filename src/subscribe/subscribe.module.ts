import { Module } from '@nestjs/common';
import { SubscribeRepository } from './subscribe.repository';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { Subscription } from './subscription.entity';

@Module({
    imports: [],
    controllers: [SubscribeController],
    exports: [SubscribeService],
    providers: [SubscribeService, SubscribeRepository],
})
export class SubscribeModule {}
