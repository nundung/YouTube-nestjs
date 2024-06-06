import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SubscriptionDao } from './dao/subscription.dao';
import { FindSubscriptionDao } from './dao/findSubscription.dao';
const prisma = new PrismaClient();

@Injectable()
export class SubscribeRepository {
    async subscribe(subscriptionDao: SubscriptionDao): Promise<void> {
        await prisma.subscription.create({
            data: {
                user_id: subscriptionDao.userId,
                subscribed_user_id: subscriptionDao.subscribedUserId,
            },
        });
    }

    async findSubscribeId(
        findSubscriptionDao: FindSubscriptionDao,
    ): Promise<any> {
        const subscribeId = await prisma.subscription.findFirst({
            where: {
                user_id: findSubscriptionDao.userId,
                subscribed_user_id: findSubscriptionDao.subscribedUserId,
            },
        });
        return subscribeId;
    }

    async unSubscribe(id: string): Promise<void> {
        const now = new Date();
        await prisma.subscription.update({
            where: {
                id: id,
            },
            data: {
                deleted_at: now,
            },
        });
    }
}
