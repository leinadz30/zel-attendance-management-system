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
exports.LinkStudentRequestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const link_student_request_create_dto_1 = require("../../core/dto/link-student-request/link-student-request.create.dto");
const link_student_request_update_dto_1 = require("../../core/dto/link-student-request/link-student-request.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const link_student_request_service_1 = require("../../services/link-student-request.service");
let LinkStudentRequestController = class LinkStudentRequestController {
    constructor(linkStudentRequestService) {
        this.linkStudentRequestService = linkStudentRequestService;
    }
    async getDetails(linkStudentRequestCode) {
        const res = {};
        try {
            res.data = await this.linkStudentRequestService.getByCode(linkStudentRequestCode);
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
            res.data = await this.linkStudentRequestService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(linkStudentRequestDto) {
        const res = {};
        try {
            res.data = await this.linkStudentRequestService.create(linkStudentRequestDto);
            res.success = true;
            res.message = `Link Student Request ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async approve(linkStudentRequestCode, dto) {
        const res = {};
        try {
            res.data = await this.linkStudentRequestService.approve(linkStudentRequestCode, dto);
            res.success = true;
            res.message = `Link Student Request ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async reject(linkStudentRequestCode, dto) {
        const res = {};
        try {
            res.data = await this.linkStudentRequestService.reject(linkStudentRequestCode, dto);
            res.success = true;
            res.message = `Link Student Request ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async cancel(linkStudentRequestCode, dto) {
        const res = {};
        try {
            res.data = await this.linkStudentRequestService.cancel(linkStudentRequestCode, dto);
            res.success = true;
            res.message = `Link Student Request ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:linkStudentRequestCode"),
    __param(0, (0, common_1.Param)("linkStudentRequestCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkStudentRequestController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], LinkStudentRequestController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [link_student_request_create_dto_1.CreateLinkStudentRequestDto]),
    __metadata("design:returntype", Promise)
], LinkStudentRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("approve/:linkStudentRequestCode"),
    __param(0, (0, common_1.Param)("linkStudentRequestCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, link_student_request_update_dto_1.UpdateLinkStudentRequestDto]),
    __metadata("design:returntype", Promise)
], LinkStudentRequestController.prototype, "approve", null);
__decorate([
    (0, common_1.Delete)("reject/:linkStudentRequestCode"),
    __param(0, (0, common_1.Param)("linkStudentRequestCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, link_student_request_update_dto_1.UpdateLinkStudentRequestDto]),
    __metadata("design:returntype", Promise)
], LinkStudentRequestController.prototype, "reject", null);
__decorate([
    (0, common_1.Delete)("cancel/:linkStudentRequestCode"),
    __param(0, (0, common_1.Param)("linkStudentRequestCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, link_student_request_update_dto_1.UpdateLinkStudentRequestDto]),
    __metadata("design:returntype", Promise)
], LinkStudentRequestController.prototype, "cancel", null);
LinkStudentRequestController = __decorate([
    (0, swagger_1.ApiTags)("link-student-request"),
    (0, common_1.Controller)("link-student-request"),
    __metadata("design:paramtypes", [link_student_request_service_1.LinkStudentRequestService])
], LinkStudentRequestController);
exports.LinkStudentRequestController = LinkStudentRequestController;
//# sourceMappingURL=link-student-request.controller.js.map