import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRepository } from './video.repository';
import { VideoController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
    imports: [TypeOrmModule.forFeature([VideoRepository])],
    controllers: [VideoController],
    providers: [VideosService],
})
export class VideosModule {}
