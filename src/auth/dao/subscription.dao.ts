export class SubscriptionDao {
    id: string;

    subscribedUserId: string;

    constructor(id: string, subscribedUserId: string) {
        this.id = id;
        this.subscribedUserId = subscribedUserId;
    }
}
