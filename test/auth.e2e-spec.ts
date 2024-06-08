import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import * as request from 'supertest';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let authService = {
        signUp: () => ['test'],
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AuthModule],
        })
            .overrideProvider(AuthService)
            .useValue(authService)
            .compile();

        app = module.createNestApplication();
        await app.init();
    });

    it('/POST signup', () => {
        const createUserDto: CreateUserDto = {
            name: 'testName',
            pw: 'testPW',
        };

        return request(app.getHttpServer())
            .post('/signup')
            .send(createUserDto)
            .expect(201)
            .expect({
                data: authService.signUp(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
