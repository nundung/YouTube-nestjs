import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        return this.userRepository.createUser({
            name: createUserDto.name,
            pw: createUserDto.pw,
        });
    }

    async signIn(
        createUserDto: CreateUserDto,
    ): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findUserByName(
            createUserDto.name,
        );

        if (!user || !(await bcrypt.compare(createUserDto.pw, user.pw))) {
            throw new UnauthorizedException('login failed');
        }

        return {
            accessToken: await this.jwtService.signAsync({ name: user.name }),
        };
    }
}
