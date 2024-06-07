//Import
import { S3Client } from '@aws-sdk/client-s3';
import multer, { Options } from 'multer';
import multerS3 from 'multer-s3';
import * as config from 'config';
import { BadRequestException } from '@nestjs/common';

const s3Config = config.get('db');

//aws region 설정
const s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || s3Config.S3_ACCESS_KEY_ID,
        secretAccessKey:
            process.env.S3_SECRET_ACCESS_KEY || s3Config.S3_SECRET_ACCESS_KEY,
    },
});

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
    if (file.mimetype.split('/')[0] != 'video') {
        return cb(new Error('동영상 형식이 올바르지 않습니다.'));
    }

    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.mkv'];
    const fileExtension = file.originalname.split('.').pop().toLowerCase();
    if (!videoExtensions.includes(fileExtension)) {
        return cb(
            new BadRequestException(
                'Invalid file type. Only video files are allowed.',
            ),
        );
    }
    const maxSize = 200 * 1024 * 1024; // 10MB를 최대 파일 크기로 지정
    if (file.size > maxSize) {
        return cb(
            new Error('파일 크기가 너무 큽니다. 최대 200MB까지 허용됩니다.'),
        );
    }

    cb(null, true); // 모든 검증을 통과한 경우, 파일을 업로드 허용
};

// export const MulterOption: Options = {
//     storage: diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'uploads/'); // 파일이 저장될 경로 지정
//         },
//         filename: function (req, file, cb) {
//             cb(null, `${Date.now()}_${file.originalname}`); // 저장될 파일명 지정
//         },
//     }),
//     fileFilter: fileFilter, // 파일 필터링 함수 설정
// };
