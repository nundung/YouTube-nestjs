import { Repository } from 'typeorm';
import { CustomRepository } from './config/typeorm-ex.decorator';
import { Video } from './video.entity';
import { User } from 'src/auth/user.entity';
import { CreateVideoDto } from './dto/create-video.dto';

console.log('실행');
@CustomRepository(Video)
export class VideoRepository extends Repository<Video> {
    async CreateVideo(
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
