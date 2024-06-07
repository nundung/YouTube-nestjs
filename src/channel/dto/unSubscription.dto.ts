export class UnSubscriptionDto {
    userId: string;

    unSubscribedUserId: string;

    constructor(userId: string, unSubscribedUserId: string) {
        this.userId = userId;
        this.unSubscribedUserId = unSubscribedUserId;
    }
}
