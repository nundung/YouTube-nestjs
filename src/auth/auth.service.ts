import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(
        authCredentialDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        const { name, pw } = authCredentialDto;
        const user = await this.userRepository.findUserByName(name);
        console.log(user);
        if (!user || !(await bcrypt.compare(pw, user.pw))) {
            throw new UnauthorizedException('login failed');
        }
        const payload = { name };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }

    async subscribe(user: User, subscribeDto: SubscriptionDto): Promise<void> {
        return await this.userRepository.subscribe(user, subscribeDto);
    }
}
