import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UserEntity } from 'src/auth/user.entity';
import { VideoEntity } from './video.entity';
import { VideosService } from './videos.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileValidationPipe } from './pipes/file-validation.pipe';

@Controller('video')
@UseGuards(AuthGuard())
export class VideoController {
    private logger = new Logger('Videos');
    constructor(private videosService: VideosService) {}

    @Post('/upload')
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('file'), MulterOption)
    async createVideo(
        @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
        @Body() createVideoDto: CreateVideoDto,
        @GetUser() user: UserEntity,
    ): Promise<VideoEntity> {
        const file_path = `/uploads/${file.filename}`;
        createVideoDto.file_path = file_path;

        this.logger.verbose(
            `User ${user.name} creating a new video. Payload: ${JSON.stringify(createVideoDto)}`,
        );

        return this.videosService.createVideo(createVideoDto, user);
    }

    @Get()
    getAllVideos(): Promise<VideoEntity[]> {
        return this.videosService.getAllVideos();
    }

    @Get('/:id')
    getVideoById(@Param('id') id: string): Promise<VideoEntity> {
        return this.videosService.getVideoById(id);
    }
}
