// import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from './bcrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private bcryptService: BcryptService,
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.pw, salt);
        try {
            await this.prisma.user.create({
                data: {
                    name: createUserDto.name,
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
    s;

    async signIn(
        createUserDto: CreateUserDto,
    ): Promise<{ accessToken: string }> {
        const user = await this.prisma.user.findUnique({
            where: { name: createUserDto.name },
        });
        if (
            !user ||
            !(await this.bcryptService.compare(createUserDto.pw, user.pw))
        ) {
            throw new UnauthorizedException('login failed');
        }

        return {
            accessToken: await this.jwtService.signAsync({ name: user.name }),
        };
    }
}
