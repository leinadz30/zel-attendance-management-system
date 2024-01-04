"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFirebaseTokenService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const user_firebase_token_constant_1 = require("../common/constant/user-firebase-token.constant");
const UserFirebaseToken_1 = require("../db/entities/UserFirebaseToken");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let UserFirebaseTokenService = class UserFirebaseTokenService {
    constructor(ueserFirebaseTokensRepo) {
        this.ueserFirebaseTokensRepo = ueserFirebaseTokensRepo;
    }
    async getByUserDevice(userId, device) {
        var _a;
        const result = await this.ueserFirebaseTokensRepo.findOne({
            where: {
                user: {
                    userId,
                },
                device,
            },
            relations: {
                user: true,
            },
        });
        if (!result) {
            throw Error(user_firebase_token_constant_1.USER_FIREBASE_TOKEN_ERROR_USER_NOT_FOUND);
        }
        if ((_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.user.password;
        }
        return result;
    }
    async create(dto) {
        return await this.ueserFirebaseTokensRepo.manager.transaction(async (entityManager) => {
            let userFirebaseTokens = await entityManager.findOne(UserFirebaseToken_1.UserFirebaseToken, {
                where: {
                    user: {
                        userId: dto.userId,
                    },
                    device: dto.device,
                },
                relations: {
                    user: true,
                },
            });
            if (!userFirebaseTokens) {
                userFirebaseTokens = new UserFirebaseToken_1.UserFirebaseToken();
                const user = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.userId,
                        active: true,
                    },
                });
                if (!user) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                userFirebaseTokens.user = user;
                userFirebaseTokens.device = dto.device;
            }
            userFirebaseTokens.firebaseToken = dto.firebaseToken;
            userFirebaseTokens = await entityManager.save(UserFirebaseToken_1.UserFirebaseToken, userFirebaseTokens);
            delete userFirebaseTokens.user.password;
            return userFirebaseTokens;
        });
    }
};
UserFirebaseTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserFirebaseToken_1.UserFirebaseToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserFirebaseTokenService);
exports.UserFirebaseTokenService = UserFirebaseTokenService;
//# sourceMappingURL=user-firebase-token.service.js.map