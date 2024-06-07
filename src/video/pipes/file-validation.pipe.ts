import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
        if (!file) {
            throw new BadRequestException('File is required');
        }

        const fiftyMb = 50 * 1024 * 1024;
        if (file.size > fiftyMb) {
            throw new BadRequestException(
                'File size too large. Max size is 50MB.',
            );
        }

        // 파일이 동영상인지 확인 (확장자가 비디오인 경우로 가정)
        const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'mkv'];
        const fileExtension = file.originalname.split('.').pop().toLowerCase();
        if (!videoExtensions.includes(fileExtension)) {
            throw new BadRequestException(
                'Invalid file type. Only video files are allowed.',
            );
        }
        console.log(file);
        return file;
    }
}
