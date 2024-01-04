import { CreateUserFirebaseTokenDto } from "src/core/dto/user-firebase-token/user-firebase-token.create.dto";
import { UserFirebaseToken } from "src/db/entities/UserFirebaseToken";
import { Repository } from "typeorm";
export declare class UserFirebaseTokenService {
    private readonly ueserFirebaseTokensRepo;
    constructor(ueserFirebaseTokensRepo: Repository<UserFirebaseToken>);
    getByUserDevice(userId: any, device: any): Promise<UserFirebaseToken>;
    create(dto: CreateUserFirebaseTokenDto): Promise<UserFirebaseToken>;
}
