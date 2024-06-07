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
        const { name, pw } = createUserDto;
        const user = await this.userRepository.findUserByName(name);
        if (!user || !(await bcrypt.compare(pw, user.pw))) {
            throw new UnauthorizedException('login failed');
        }
        const payload = { name };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
