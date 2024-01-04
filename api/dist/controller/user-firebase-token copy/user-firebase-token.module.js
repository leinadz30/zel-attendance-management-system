"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFirebaseTokenModule = void 0;
const common_1 = require("@nestjs/common");
const user_firebase_token_controller_1 = require("./user-firebase-token.controller");
const user_firebase_token_service_1 = require("../../services/user-firebase-token.service");
const typeorm_1 = require("@nestjs/typeorm");
const UserFirebaseToken_1 = require("../../db/entities/UserFirebaseToken");
let UserFirebaseTokenModule = class UserFirebaseTokenModule {
};
UserFirebaseTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([UserFirebaseToken_1.UserFirebaseToken])],
        controllers: [user_firebase_token_controller_1.UserFirebaseTokenController],
        providers: [user_firebase_token_service_1.UserFirebaseTokenService],
        exports: [user_firebase_token_service_1.UserFirebaseTokenService],
    })
], UserFirebaseTokenModule);
exports.UserFirebaseTokenModule = UserFirebaseTokenModule;
//# sourceMappingURL=user-firebase-token.module.js.map