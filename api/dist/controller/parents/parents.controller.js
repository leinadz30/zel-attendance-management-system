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
exports.ParentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const parents_update_dto_1 = require("../../core/dto/parents/parents.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const parents_service_1 = require("../../services/parents.service");
const reset_password_dto_1 = require("../../core/dto/auth/reset-password.dto");
const reset_password_dto_copy_1 = require("../../core/dto/auth/reset-password.dto copy");
let ParentsController = class ParentsController {
    constructor(parentsService) {
        this.parentsService = parentsService;
    }
    async getDetails(parentCode) {
        const res = {};
        try {
            res.data = await this.parentsService.getByCode(parentCode);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getParentStudents(parentCode) {
        const res = {};
        try {
            res.data = await this.parentsService.getParentStudents(parentCode);
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
            res.data = await this.parentsService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateProfile(parentCode, dto) {
        const res = {};
        try {
            res.data = await this.parentsService.updateProfile(parentCode, dto);
            res.success = true;
            res.message = `Parent ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async approveAccessRequest(parentCode) {
        const res = {};
        try {
            res.data = await this.parentsService.approveAccessRequest(parentCode);
            res.success = true;
            res.message = `Parent ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(parentCode) {
        const res = {};
        try {
            res.data = await this.parentsService.delete(parentCode);
            res.success = true;
            res.message = `Parent ${api_response_constant_1.DELETE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async resetPassword(parentCode, updateUserResetPasswordDto) {
        const res = {};
        try {
            res.data = await this.parentsService.resetPassword(parentCode, updateUserResetPasswordDto);
            res.success = true;
            res.message = `Parent password ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateProfilePicture(parentCode, dto) {
        const res = {};
        try {
            res.data = await this.parentsService.updateProfilePicture(parentCode, dto);
            res.success = true;
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
    (0, common_1.Get)("/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)("getParentStudents/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getParentStudents", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Put)("updateProfile/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, parents_update_dto_1.UpdateParentUserProfileDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)("approveAccessRequest/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "approveAccessRequest", null);
__decorate([
    (0, common_1.Delete)("/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)("resetPassword/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_1.UpdateUserResetPasswordDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)("/updateProfilePicture/:parentCode"),
    __param(0, (0, common_1.Param)("parentCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_copy_1.UpdateProfilePictureDto]),
    __metadata("design:returntype", Promise)
], ParentsController.prototype, "updateProfilePicture", null);
ParentsController = __decorate([
    (0, swagger_1.ApiTags)("parents"),
    (0, common_1.Controller)("parents"),
    __metadata("design:paramtypes", [parents_service_1.ParentsService])
], ParentsController);
exports.ParentsController = ParentsController;
//# sourceMappingURL=parents.controller.js.map