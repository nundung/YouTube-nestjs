import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { SubscriptionDto } from './dto/subscription.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserRepository {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { name, pw } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pw, salt);

        try {
            await prisma.user.create({
                data: {
                    name,
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

    async subscribe(user: User, subscribeDto: SubscriptionDto): Promise<void> {
        const { id } = user;
        const { subscribedUserId } = subscribeDto;
        await prisma.subscription.create({
            data: {
                user_id: id,
                subscribed_user_id: subscribedUserId,
            },
        });
    }
}
