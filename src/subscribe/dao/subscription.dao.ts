export class SubscriptionDao {
    userId: string;

    subscribedUserId: string;

    constructor(userId: string, subscribedUserId: string) {
        this.userId = userId;
        this.subscribedUserId = subscribedUserId;
    }
}
