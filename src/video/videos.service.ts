import { Injectable } from '@nestjs/common';
import { VideoRepository } from './video.repository';
import { CreateVideoDto } from './dto/create-video.dto';
import { User } from 'src/auth/user.entity';
import { Video } from './video.entity';

@Injectable()
export class VideosService {
    constructor(private videoRepository: VideoRepository) {}

    async createVideo(
        createVideoDto: CreateVideoDto,
        user: User,
    ): Promise<Video> {
        return this.videoRepository.createVideo(createVideoDto, user);
    }
}
