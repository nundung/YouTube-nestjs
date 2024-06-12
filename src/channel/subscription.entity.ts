import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class SubscriptionEntity {
    public id: string;
    public userId: string;
    public subscribedUserId: string;
    public createdAt: Date;
    public deletedAt: Date | null;

    constructor(data: SubscriptionEntity) {
        this.id = data.id;
        this.userId = data.userId;
        this.subscribedUserId = data.subscribedUserId;
        this.createdAt = data.createdAt;
        this.deletedAt = data.deletedAt;
    }
}
