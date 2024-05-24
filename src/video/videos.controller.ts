import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { User } from 'src/auth/user.entity';
import { Video } from './video.entity';
import { VideosService } from './videos.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('video')
@UseGuards(AuthGuard())
export class VideoController {
    private logger = new Logger('Videos');
    constructor(private videosService: VideosService) {}

    @Post()
    createVideo(
        @Body() createVideoDto: CreateVideoDto,
        @GetUser() user: User,
    ): Promise<Video> {
        // this.logger.verbose(
        //     `User ${user.username} creating a new board.Payload: ${JSON.stringify(createBoardDto)}`,
        // );
        return this.videosService.createVideo(createVideoDto, user);
    }
}
