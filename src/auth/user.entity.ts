import { Video } from 'src/video/video.entity';

export class User {
    public id: string;
    public name: string;
    public pw: string;
    public videos: Video[];
    public created_at: Date;
    public deleted_at: Date;

    constructor(data: User) {
        this.id = data.id;
        this.name = data.name;
        this.pw = data.pw;
        this.videos = data.videos;
        this.created_at = data.created_at;
        this.deleted_at = data.deleted_at;
    }
}
