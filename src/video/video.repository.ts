import { Repository } from 'typeorm';
import { CustomRepository } from './config/typeorm-ex.decorator';
import { Video } from './video.entity';
import { User } from 'src/auth/user.entity';
import { CreateVideoDto } from './dto/create-video.dto';

@CustomRepository(Video)
export class VideoRepository extends Repository<Video> {
    async CreateVideo(
        createVideoDto: CreateVideoDto,
        user: User,
    ): Promise<Video> {
        const { title, description } = createVideoDto;
        const video = this.create({
            title,
            description,
            user,
        });
        await this.save(video);
        return video;
    }
}
