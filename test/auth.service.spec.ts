import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserRepository } from 'src/auth/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
    let jwtService: JwtService;
    let authService: AuthService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AuthModule,
                JwtModule.register({
                    secret: 'testSecret',
                    signOptions: { expiresIn: '1h' },
                }),
            ],
            providers: [AuthService, JwtService, UserRepository, PrismaService],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        jwtService = moduleRef.get<JwtService>(JwtService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    it('AuthService.signIn', async () => {
        const createUserDto: CreateUserDto = {
            name: 'test01',
            pw: 'test01',
        };
        const signInResult = jest
            .spyOn(authService, 'signIn')
            .mockImplementation();

        expect(signInResult).toBeUndefined;
    });
});
