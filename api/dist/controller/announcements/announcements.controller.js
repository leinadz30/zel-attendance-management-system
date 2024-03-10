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
exports.AnnouncementsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const announcements_create_dto_1 = require("../../core/dto/announcements/announcements.create.dto");
const announcements_update_dto_1 = require("../../core/dto/announcements/announcements.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const announcements_service_1 = require("../../services/announcements.service");
let AnnouncementsController = class AnnouncementsController {
    constructor(announcementsService) {
        this.announcementsService = announcementsService;
    }
    async getDetails(announcementCode) {
        const res = {};
        try {
            res.data = await this.announcementsService.getByCode(announcementCode);
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
            res.data = await this.announcementsService.getAnnouncementsPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(announcementsDto) {
        const res = {};
        try {
            res.data = await this.announcementsService.create(announcementsDto);
            res.success = true;
            res.message = `Announcements ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(announcementCode, dto) {
        const res = {};
        try {
            res.data = await this.announcementsService.update(announcementCode, dto);
            res.success = true;
            res.message = `Announcements ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async cancel(announcementCode) {
        const res = {};
        try {
            res.data = await this.announcementsService.cancel(announcementCode);
            res.success = true;
            res.message = `Announcements Cancelled!`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(announcementCode) {
        const res = {};
        try {
            res.data = await this.announcementsService.delete(announcementCode);
            res.success = true;
            res.message = `Announcements ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:announcementCode"),
    __param(0, (0, common_1.Param)("announcementCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], AnnouncementsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [announcements_create_dto_1.CreateAnnouncementDto]),
    __metadata("design:returntype", Promise)
], AnnouncementsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:announcementCode"),
    __param(0, (0, common_1.Param)("announcementCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, announcements_update_dto_1.UpdateAnnouncementDto]),
    __metadata("design:returntype", Promise)
], AnnouncementsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("cancel/:announcementCode"),
    __param(0, (0, common_1.Param)("announcementCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementsController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)("/:announcementCode"),
    __param(0, (0, common_1.Param)("announcementCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnnouncementsController.prototype, "delete", null);
AnnouncementsController = __decorate([
    (0, swagger_1.ApiTags)("announcements"),
    (0, common_1.Controller)("announcements"),
    __metadata("design:paramtypes", [announcements_service_1.AnnouncementsService])
], AnnouncementsController);
exports.AnnouncementsController = AnnouncementsController;
//# sourceMappingURL=announcements.controller.js.map