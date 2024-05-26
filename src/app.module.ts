import { Module } from '@nestjs/common';
import { VideoController } from './video/videos.controller';
import { VideosService } from './video/videos.service';
import { VideosModule } from './video/videos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || jwtConfig.secret,
            signOptions: { expiresIn: jwtConfig.expiresIn },
        }),
        TypeOrmModule.forRoot(typeORMConfig),
        VideosModule,
    ],
    controllers: [VideoController],
    // providers: [VideosService],
})
export class AppModule {}
