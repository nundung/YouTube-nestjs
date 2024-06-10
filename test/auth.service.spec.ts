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

        // userRepository.findUserByName을 모킹하여 가짜 사용자 반환
        const user = { name: 'test01', pw: 'hashedPassword' };
        jest.spyOn(userRepository, 'findUserByName').mockResolvedValue(user);

        // bcrypt.compare 모킹하여 항상 true 반환

        // jwtService.signAsync 모킹하여 가짜 accessToken 반환
        const fakeAccessToken = 'fakeAccessToken';
        jest.spyOn(jwtService, 'signAsync').mockResolvedValue(fakeAccessToken);

        // signIn 메서드 호출
        const result = await authService.signIn(createUserDto);

        // signIn 메서드가 예상대로 작동하는지 확인
        expect(result).toEqual({ accessToken: fakeAccessToken });

        // jwtService.signAsync이 올바르게 호출되었는지 확인
        expect(jwtService.signAsync).toHaveBeenCalledWith({ name: user.name });

        // authService.signIn이 호출되었는지 확인
        expect(authService.signIn).toHaveBeenCalled();
    });
});
