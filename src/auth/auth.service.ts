import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser({
            name: authCredentialDto.name,
            pw: authCredentialDto.pw,
        });
    }

    async signIn(
        authCredentialDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        const { name, pw } = authCredentialDto;
        const user = await this.userRepository.findUserByName(name);
        if (!user || !(await bcrypt.compare(pw, user.pw))) {
            throw new UnauthorizedException('login failed');
        }
        const payload = { name };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
