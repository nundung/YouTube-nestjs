import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from 'src/channel/dto/subscription.dto';
import { ChannelRepository } from './channel.repository';
import { UnSubscriptionDto } from './dto/unSubscription.dto';

@Injectable()
export class ChannelService {
    constructor(private channelRepository: ChannelRepository) {}
    async subscribe(
        id: string,
        subscriptionDto: SubscriptionDto,
    ): Promise<void> {
        return await this.channelRepository.subscribe({
            userId: id,
            subscribedUserId: subscriptionDto.subscribedUserId,
        });
    }

    async unSubscribe(
        id: string,
        unSubscriptionDto: UnSubscriptionDto,
    ): Promise<void> {
        const subscribeId: string =
            await this.channelRepository.findSubscribeId({
                userId: id,
                subscribedUserId: unSubscriptionDto.unSubscribedUserId,
            });
        return await this.channelRepository.unSubscribe(subscribeId);
    }
}