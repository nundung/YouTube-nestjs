import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import { BcryptService } from 'src/auth/bcrypt.service';

describe('AuthService', () => {
    let prisma: PrismaService;
    let jwtService: JwtService;
    let authService: AuthService;
    let bcryptService: BcryptService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [AuthService, JwtService, PrismaService, BcryptService],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        prisma = moduleRef.get<PrismaService>(PrismaService);
        jwtService = moduleRef.get<JwtService>(JwtService);
        bcryptService = moduleRef.get<BcryptService>(BcryptService); // bcryptService 인스턴스 가져오기
    });

    it('AuthService.signIn', async () => {
        const createUserDto: CreateUserDto = {
            name: 'testName',
            pw: 'testPw',
        };
        const mockUser = {
            id: 'someId',
            name: 'testName',
            pw: 'testPw',
            createdAt: new Date(),
            deletedAt: new Date(),
        };
        const findMock = jest
            .spyOn(prisma.user, 'findUnique')
            .mockResolvedValue(mockUser);

        const compareMock = jest
            .spyOn(bcryptService, 'compare')
            .mockResolvedValue(true);

        const tokenMock = jest
            .spyOn(jwtService, 'signAsync')
            .mockResolvedValue('fakeAccessToken');

        // signIn 메서드가 예상대로 작동하는지 확인
        const result = await authService.signIn(createUserDto);

        expect(result.accessToken).toEqual('fakeAccessToken');
        // expect(findMock).toHaveBeenCalledTimes(1);
        expect(compareMock).toHaveBeenCalledTimes(1);
        expect(tokenMock).toHaveBeenCalledTimes(1);
    });
});
