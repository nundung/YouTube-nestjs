import { DataSource, Repository } from 'typeorm';
import { Video } from './video.entity';
import { User } from 'src/auth/user.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoRepository extends Repository<Video> {
    constructor(private dataSource: DataSource) {
        super(Video, dataSource.createEntityManager());
    }
    async createVideo(
        createVideoDto: CreateVideoDto,
        user: User,
    ): Promise<Video> {
        const { file, title, description } = createVideoDto;
        const video = this.create({
            file,
            title,
            description,
            user,
        });
        await this.save(video);
        return video;
    }
}
