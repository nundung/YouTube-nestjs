import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDao } from './dao/create-user.dao';
import { SubscriptionDao } from './dao/subscription.dao';

const prisma = new PrismaClient();

@Injectable()
export class UserRepository {
    async createUser(createUserDao: CreateUserDao): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDao.pw, salt);
        try {
            await prisma.user.create({
                data: {
                    name: createUserDao.name,
                    pw: hashedPassword,
                },
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findUserByName(name: string): Promise<any> {
        const user = await prisma.user.findUnique({
            where: {
                name,
            },
        });
        return user;
    }

    async subscribe(subscriptionDao: SubscriptionDao): Promise<void> {
        await prisma.subscription.create({
            data: {
                user_id: subscriptionDao.id,
                subscribed_user_id: subscriptionDao.subscribedUserId,
            },
        });
    }

    async unSubscribe(SubscriptionDao: SubscriptionDao): Promise<void> {
        const now = new Date();
        await prisma.subscription.update({
            where: {
                id: SubscriptionDao.id,
            },
            data: {
                deleted_at: now,
            },
        });
    }
}
