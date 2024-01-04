import { DefaultUserFirebaseTokenDto } from "src/core/dto/user-firebase-token/user-firebase-token-base.dto";
import { CreateUserFirebaseTokenDto } from "src/core/dto/user-firebase-token/user-firebase-token.create.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { UserFirebaseToken } from "src/db/entities/UserFirebaseToken";
import { UserFirebaseTokenService } from "src/services/user-firebase-token.service";
export declare class UserFirebaseTokenController {
    private readonly userFirebaseTokensService;
    constructor(userFirebaseTokensService: UserFirebaseTokenService);
    getByDevice(params: DefaultUserFirebaseTokenDto): Promise<ApiResponseModel<UserFirebaseToken>>;
    create(userFirebaseTokensDto: CreateUserFirebaseTokenDto): Promise<ApiResponseModel<UserFirebaseToken>>;
}
