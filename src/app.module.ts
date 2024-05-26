import { Module } from '@nestjs/common';
import { VideoController } from './video/videos.controller';
import { VideosService } from './video/videos.service';
import { VideosModule } from './video/videos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthModuleOptions, PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './auth/user.repository';
import { VideoRepository } from './video/video.repository';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        AuthModule,
        VideosModule,
    ],
    controllers: [VideoController, AuthController],
    providers: [AuthService, UserRepository, VideoRepository],
})
export class AppModule {}
