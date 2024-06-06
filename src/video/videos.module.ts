import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './videos.controller';
import { VideosService } from './videos.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [VideoController],
    exports: [VideosService],
    providers: [VideosService],
})
export class VideosModule {}
