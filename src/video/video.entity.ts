import { UserEntity } from 'src/auth/user.entity';

export class VideoEntity {
    public id: string;
    public user_id: string;
    public file_path: string;
    public title: string;
    public description: string;
    public created_at: Date;
    public deleted_at: Date | null;

    constructor(data: VideoEntity) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.file_path = data.file_path;
        this.title = data.title;
        this.created_at = data.created_at;
        this.deleted_at = data.deleted_at;
    }
}
