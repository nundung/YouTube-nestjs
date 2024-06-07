import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class SubscriptionEntity {
    public id: string;
    public user_id: string;
    public subscribed_user_id: string;
    public created_at: Date;
    public deleted_at: Date | null;

    constructor(data: SubscriptionEntity) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.subscribed_user_id = data.subscribed_user_id;
        this.created_at = data.created_at;
        this.deleted_at = data.deleted_at;
    }
}
