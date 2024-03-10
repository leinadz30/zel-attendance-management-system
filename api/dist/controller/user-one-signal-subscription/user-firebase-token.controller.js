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
exports.UserFirebaseTokenController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const user_firebase_token_base_dto_1 = require("../../core/dto/user-firebase-token/user-firebase-token-base.dto");
const user_firebase_token_create_dto_1 = require("../../core/dto/user-firebase-token/user-firebase-token.create.dto");
const user_firebase_token_service_1 = require("../../services/user-firebase-token.service");
let UserFirebaseTokenController = class UserFirebaseTokenController {
    constructor(userFirebaseTokensService) {
        this.userFirebaseTokensService = userFirebaseTokensService;
    }
    async getByDevice(params) {
        const res = {};
        try {
            res.data = await this.userFirebaseTokensService.getByUserDevice(params.userId, params.device);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(userFirebaseTokensDto) {
        const res = {};
        try {
            res.data = await this.userFirebaseTokensService.create(userFirebaseTokensDto);
            res.success = true;
            res.message = `UserFirebaseToken ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
};
__decorate([
    (0, common_1.Post)("/getByDevice"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_firebase_token_base_dto_1.DefaultUserFirebaseTokenDto]),
    __metadata("design:returntype", Promise)
], UserFirebaseTokenController.prototype, "getByDevice", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_firebase_token_create_dto_1.CreateUserFirebaseTokenDto]),
    __metadata("design:returntype", Promise)
], UserFirebaseTokenController.prototype, "create", null);
UserFirebaseTokenController = __decorate([
    (0, swagger_1.ApiTags)("user-firebase-token"),
    (0, common_1.Controller)("user-firebase-token"),
    __metadata("design:paramtypes", [user_firebase_token_service_1.UserFirebaseTokenService])
], UserFirebaseTokenController);
exports.UserFirebaseTokenController = UserFirebaseTokenController;
//# sourceMappingURL=user-firebase-token.controller.js.map