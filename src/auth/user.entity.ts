import { Video } from 'src/video/video.entity';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    pw: string;

    @OneToMany((type) => Video, (video) => video.user, { eager: true })
    videos: Video[];

    @Column()
    created_at: Date;

    @Column()
    deleted_at: Date;
}
