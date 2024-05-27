import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoRepository } from './video.repository';
import { CreateVideoDto } from './dto/create-video.dto';
import { User } from 'src/auth/user.entity';
import { Video } from './video.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VideosService {
    constructor(
        @InjectRepository(VideoRepository)
        private videoRepository: VideoRepository,
    ) {}

    async createVideo(
        createVideoDto: CreateVideoDto,
        user: User,
    ): Promise<Video> {
        return this.videoRepository.createVideo(createVideoDto, user);
    }

    async getAllVideos(): Promise<Video[]> {
        return this.videoRepository.find();
    }

    async getVideoById(id: string): Promise<Video> {
        const found = await this.videoRepository.findOne({
            where: { id: id },
        });
        if (!found) {
            throw new NotFoundException(`Can't find Video with id ${id}`);
        }
        return found;
    }
}
