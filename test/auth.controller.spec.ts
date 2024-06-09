import { JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { UserRepository } from 'src/auth/user.repository';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let userRepository: UserRepository;
    let jwtService: JwtService;

    beforeAll(async () => {
        userRepository = {} as UserRepository;
        jwtService = {} as JwtService;
        authService = new AuthService(userRepository, jwtService);
        authController = new AuthController(authService);
    });

    it('AuthController.signUp', async () => {
        const createUserDto: CreateUserDto = {
            name: 'testName',
            pw: 'testPW',
        };

        jest.spyOn(authService, 'signUp').mockImplementation();

        const signUpResult = await authController.signUp(createUserDto);
        expect(signUpResult).toBeUndefined;
    });
});
