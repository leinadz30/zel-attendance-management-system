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
exports.AppReleaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const app_release_create_dto_1 = require("../../core/dto/app-release/app-release.create.dto");
const app_release_update_dto_1 = require("../../core/dto/app-release/app-release.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const app_release_service_1 = require("../../services/app-release.service");
let AppReleaseController = class AppReleaseController {
    constructor(appReleasesService) {
        this.appReleasesService = appReleasesService;
    }
    async getDetails(id) {
        const res = {};
        try {
            res.data = await this.appReleasesService.getByCode(id);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getLatestVersion(appTypeCode) {
        const res = {};
        try {
            res.data = await this.appReleasesService.getLatestVersion(appTypeCode);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getPaginated(params) {
        const res = {};
        try {
            res.data = await this.appReleasesService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(dto) {
        const res = {};
        try {
            res.data = await this.appReleasesService.create(dto);
            res.success = true;
            res.message = `App Release ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(id, dto) {
        const res = {};
        try {
            res.data = await this.appReleasesService.update(id, dto);
            res.success = true;
            res.message = `App Release ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(id) {
        const res = {};
        try {
            res.data = await this.appReleasesService.delete(id);
            res.success = true;
            res.message = `App Release ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppReleaseController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)("/getLatestVersion/:appTypeCode"),
    __param(0, (0, common_1.Param)("appTypeCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppReleaseController.prototype, "getLatestVersion", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], AppReleaseController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_release_create_dto_1.CreateAppReleaseDto]),
    __metadata("design:returntype", Promise)
], AppReleaseController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, app_release_update_dto_1.UpdateAppReleaseDto]),
    __metadata("design:returntype", Promise)
], AppReleaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppReleaseController.prototype, "delete", null);
AppReleaseController = __decorate([
    (0, swagger_1.ApiTags)("app-release"),
    (0, common_1.Controller)("app-release"),
    __metadata("design:paramtypes", [app_release_service_1.AppReleaseService])
], AppReleaseController);
exports.AppReleaseController = AppReleaseController;
//# sourceMappingURL=app-release.controller.js.map