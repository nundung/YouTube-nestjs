import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRepository } from './video.repository';
import { VideoController } from './videos.controller';
import { VideosService } from './videos.service';
import { Video } from './video.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Video]),
        TypeOrmModule.forFeature([VideoRepository]),
    ],
    controllers: [VideoController],
    exports: [VideosService],
    providers: [VideosService, VideoRepository],
})
export class VideosModule {}
