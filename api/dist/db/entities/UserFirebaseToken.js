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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFirebaseToken = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UserFirebaseToken = class UserFirebaseToken {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "UserId" }),
    __metadata("design:type", String)
], UserFirebaseToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { primary: true, name: "FirebaseToken" }),
    __metadata("design:type", String)
], UserFirebaseToken.prototype, "firebaseToken", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { primary: true, name: "Device" }),
    __metadata("design:type", String)
], UserFirebaseToken.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.userFirebaseTokens),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], UserFirebaseToken.prototype, "user", void 0);
UserFirebaseToken = __decorate([
    (0, typeorm_1.Index)("UserFirebaseToken_pkey", ["device", "firebaseToken", "userId"], {
        unique: true,
    }),
    (0, typeorm_1.Entity)("UserFirebaseToken", { schema: "dbo" })
], UserFirebaseToken);
exports.UserFirebaseToken = UserFirebaseToken;
//# sourceMappingURL=UserFirebaseToken.js.map