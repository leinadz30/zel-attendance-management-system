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
exports.OperatorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const reset_password_dto_1 = require("../../core/dto/auth/reset-password.dto");
const operators_create_dto_1 = require("../../core/dto/operators/operators.create.dto");
const operators_update_dto_1 = require("../../core/dto/operators/operators.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const operators_service_1 = require("../../services/operators.service");
let OperatorsController = class OperatorsController {
    constructor(operatorsService) {
        this.operatorsService = operatorsService;
    }
    async getDetails(operatorCode) {
        const res = {};
        try {
            res.data = await this.operatorsService.getByCode(operatorCode);
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
            res.data = await this.operatorsService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(params) {
        const res = {};
        try {
            res.data = await this.operatorsService.create(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(operatorCode, dto) {
        const res = {};
        try {
            res.data = await this.operatorsService.update(operatorCode, dto);
            res.success = true;
            res.message = `Operator ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async resetPassword(operatorCode, dto) {
        const res = {};
        try {
            res.data = await this.operatorsService.resetPassword(operatorCode, dto);
            res.success = true;
            res.message = `Operator password ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async approveAccessRequest(operatorCode) {
        const res = {};
        try {
            res.data = await this.operatorsService.approveAccessRequest(operatorCode);
            res.success = true;
            res.message = `Operator ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(operatorCode) {
        const res = {};
        try {
            res.data = await this.operatorsService.delete(operatorCode);
            res.success = true;
            res.message = `Operator ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:operatorCode"),
    __param(0, (0, common_1.Param)("operatorCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [operators_create_dto_1.CreateOperatorUserDto]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:operatorCode"),
    __param(0, (0, common_1.Param)("operatorCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, operators_update_dto_1.UpdateOperatorUserDto]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("resetPassword/:operatorCode"),
    __param(0, (0, common_1.Param)("operatorCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_1.UpdateUserResetPasswordDto]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)("approveAccessRequest/:operatorCode"),
    __param(0, (0, common_1.Param)("operatorCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "approveAccessRequest", null);
__decorate([
    (0, common_1.Delete)("/:operatorCode"),
    __param(0, (0, common_1.Param)("operatorCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "delete", null);
OperatorsController = __decorate([
    (0, swagger_1.ApiTags)("operators"),
    (0, common_1.Controller)("operators"),
    __metadata("design:paramtypes", [operators_service_1.OperatorsService])
], OperatorsController);
exports.OperatorsController = OperatorsController;
//# sourceMappingURL=operators.controller.js.map