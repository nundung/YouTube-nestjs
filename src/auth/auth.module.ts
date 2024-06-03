import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { typeORMConfig } from 'src/config/typeorm.config';
import { User } from './user.entity';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    exports: [JwtStrategy, PassportModule, UserRepository, AuthService],
    providers: [AuthService, JwtStrategy, UserRepository],
})
export class AuthModule {}
