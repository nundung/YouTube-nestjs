import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { VideoController } from './video/videos.controller';
import { VideosService } from './video/videos.service';
import { VideoRepository } from './video/video.repository';
import { TypeOrmExModule } from './video/config/typeorm-ex.module';
import { VideosModule } from './video/videos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './video/config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmExModule.forCustomRepository([VideoRepository]),
        // VideosModule,
    ],
    // controllers: [VideoController],
    // providers: [VideosService],
})
export class AppModule {}
