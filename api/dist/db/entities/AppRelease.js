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
exports.AppRelease = void 0;
const typeorm_1 = require("typeorm");
let AppRelease = class AppRelease {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "Id" }),
    __metadata("design:type", String)
], AppRelease.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description" }),
    __metadata("design:type", String)
], AppRelease.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("character", { name: "AppTypeCode", unique: true, length: 1 }),
    __metadata("design:type", String)
], AppRelease.prototype, "appTypeCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "AppVersion", unique: true }),
    __metadata("design:type", String)
], AppRelease.prototype, "appVersion", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "AppBuild", unique: true }),
    __metadata("design:type", String)
], AppRelease.prototype, "appBuild", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "Date",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", String)
], AppRelease.prototype, "date", void 0);
AppRelease = __decorate([
    (0, typeorm_1.Index)("u_version_build", ["appBuild", "appTypeCode", "appVersion"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("AppRelease_pkey", ["id"], { unique: true }),
    (0, typeorm_1.Entity)("AppRelease", { schema: "dbo" })
], AppRelease);
exports.AppRelease = AppRelease;
//# sourceMappingURL=AppRelease.js.map