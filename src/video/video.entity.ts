import { User } from 'src/auth/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Video extends BaseEntity {
    @PrimaryColumn()
    idx: number;

    @Column()
    file: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne((type) => User, (user) => user.videos, { eager: false })
    user: User;
}
