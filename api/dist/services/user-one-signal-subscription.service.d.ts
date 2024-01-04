import { CreateUserOneSignalSubscriptionDto } from "src/core/dto/user-one-signal-subscription/user-one-signal-subscription.create.dto";
import { UserOneSignalSubscription } from "src/db/entities/UserOneSignalSubscription";
import { Repository } from "typeorm";
export declare class UserOneSignalSubscriptionService {
    private readonly ueserFirebaseTokensRepo;
    constructor(ueserFirebaseTokensRepo: Repository<UserOneSignalSubscription>);
    getBySubscriptionId(subscriptionId: any): Promise<UserOneSignalSubscription>;
    create(dto: CreateUserOneSignalSubscriptionDto): Promise<UserOneSignalSubscription>;
}
