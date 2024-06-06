import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    subscribed_user_id: string;

    @Column()
    created_at: string;

    @Column()
    deleted_at: string;
}
