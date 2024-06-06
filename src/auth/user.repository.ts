import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDao } from './dao/create-user.dao';

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
}
