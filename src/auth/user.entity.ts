import { VideoEntity } from 'src/video/video.entity';

export class UserEntity {
    public id: string;
    public name: string;
    public pw: string;
    public videos: VideoEntity[];
    public created_at: Date;
    public deleted_at: Date | null;

    constructor(data: UserEntity) {
        this.id = data.id;
        this.name = data.name;
        this.pw = data.pw;
        this.videos = data.videos;
        this.created_at = data.created_at;
        this.deleted_at = data.deleted_at;
    }
}
