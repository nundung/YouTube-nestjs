import { Injectable } from '@nestjs/common';
import { SubscriptionDto } from 'src/channel/dto/subscription.dto';
import { UnSubscriptionDto } from './dto/unSubscription.dto';
import { SubscriptionEntity } from './subscription.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChannelService {
    constructor(private prisma: PrismaService) {}
    async subscribe(subscriptionDto: SubscriptionDto): Promise<void> {
        try {
            await this.prisma.subscription.create({
                data: {
                    userId: subscriptionDto.userId,
                    subscribedUserId: subscriptionDto.subscribedUserId,
                },
            });
        } catch (error) {}
    }

    async unSubscribe(
        id: string,
        unSubscriptionDto: UnSubscriptionDto,
    ): Promise<void> {
        const now = new Date();
        const subscription: SubscriptionEntity =
            await this.prisma.subscription.update({
                where: {
                    id: id,
                },
                data: {
                    deletedAt: now,
                },
            });
    }
}
