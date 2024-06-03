import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from 'src/subscribe/dto/subscription.dto';
import { SubscribeRepository } from './subscribe.repository';
import { JwtService } from '@nestjs/jwt';
import { UnSubscriptionDto } from './dto/unSubscription.dto';

@Injectable()
export class subscribeService {
    constructor(
        private subscribeRepository: SubscribeRepository,
        private jwtService: JwtService,
    ) {}
    async subscribe(
        id: string,
        subscriptionDto: SubscriptionDto,
    ): Promise<void> {
        return await this.subscribeRepository.subscribe({
            userId: id,
            subscribedUserId: subscriptionDto.subscribedUserId,
        });
    }

    async unSubscribe(
        id: string,
        unSubscriptionDto: UnSubscriptionDto,
    ): Promise<void> {
        const subscribeId: string =
            await this.subscribeRepository.findSubscribeId({
                userId: id,
                subscribedUserId: unSubscriptionDto.unSubscribedUserId,
            });
        return await this.subscribeRepository.unSubscribe({
            subscribeId: string,
        });
    }
}
