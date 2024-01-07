import { CreateUserOneSignalSubscriptionDto } from "src/core/dto/user-one-signal-subscription/user-one-signal-subscription.create.dto";
import { UserOneSignalSubscription } from "src/db/entities/UserOneSignalSubscription";
import { Repository } from "typeorm";
import { PusherService } from "./pusher.service";
export declare class UserOneSignalSubscriptionService {
    private readonly ueserFirebaseTokensRepo;
    private pusherService;
    constructor(ueserFirebaseTokensRepo: Repository<UserOneSignalSubscription>, pusherService: PusherService);
    getBySubscriptionId(subscriptionId: any): Promise<UserOneSignalSubscription>;
    create(dto: CreateUserOneSignalSubscriptionDto): Promise<UserOneSignalSubscription>;
    mobileOneSignalScanner(): Promise<void>;
}
