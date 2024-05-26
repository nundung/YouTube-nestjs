import { UUID } from 'crypto';
import { User } from 'src/auth/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    file_path: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.videos, { eager: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
