import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UserEntity } from 'src/auth/user.entity';
import { VideoEntity } from './video.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideosService {
    constructor(private prisma: PrismaService) {}

    async createVideo(
        createVideoDto: CreateVideoDto,
        user: UserEntity,
    ): Promise<VideoEntity> {
        const video = await this.prisma.video.create({
            data: {
                user_id: user.id,
                file_path: createVideoDto.file_path,
                title: createVideoDto.title,
                description: createVideoDto.description,
            },
        });
        return new VideoEntity(video);
    }

    async getAllVideos(): Promise<VideoEntity[]> {
        const videos = await this.prisma.video.findMany();
        return videos.map((video) => new VideoEntity(video));
    }

    async getVideoById(id: string): Promise<VideoEntity> {
        const video = await this.prisma.video.findUnique({
            where: { id: id },
        });
        if (!video) {
            throw new NotFoundException(`Can't find Video with id ${id}`);
        }
        return new VideoEntity(video);
    }
}
