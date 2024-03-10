"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppReleaseModule = void 0;
const common_1 = require("@nestjs/common");
const app_release_controller_1 = require("./app-release.controller");
const AppRelease_1 = require("../../db/entities/AppRelease");
const app_release_service_1 = require("../../services/app-release.service");
const typeorm_1 = require("@nestjs/typeorm");
let AppReleaseModule = class AppReleaseModule {
};
AppReleaseModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([AppRelease_1.AppRelease])],
        controllers: [app_release_controller_1.AppReleaseController],
        providers: [app_release_service_1.AppReleaseService],
        exports: [app_release_service_1.AppReleaseService],
    })
], AppReleaseModule);
exports.AppReleaseModule = AppReleaseModule;
//# sourceMappingURL=app-release.module.js.map