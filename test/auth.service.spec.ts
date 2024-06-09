import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UserRepository } from 'src/auth/user.repository';

describe('AuthService', () => {
    let jwtService: JwtService;
    let authService: AuthService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            // imports: [JwtService, UserRepository],
            providers: [AuthService],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
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
