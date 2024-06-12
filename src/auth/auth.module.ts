import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BcryptService } from './bcrypt.service';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PrismaModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        }),
    ],
    providers: [BcryptService, AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
