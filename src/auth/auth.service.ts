import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        const { name, pw } = authCredentialsDto;
        const user = await this.userRepository.findOne({
            where: { name: name },
        });

        if (!user || !(await bcrypt.compare(pw, user.pw))) {
            throw new UnauthorizedException('login failed');
        }
        const payload = { name };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
