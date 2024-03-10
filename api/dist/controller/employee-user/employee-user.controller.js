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
exports.EmployeeUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const reset_password_dto_1 = require("../../core/dto/auth/reset-password.dto");
const employee_user_create_dto_1 = require("../../core/dto/employee-user/employee-user.create.dto");
const employee_user_update_dto_1 = require("../../core/dto/employee-user/employee-user.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const employee_user_service_1 = require("../../services/employee-user.service");
let EmployeeUserController = class EmployeeUserController {
    constructor(employeeUserService) {
        this.employeeUserService = employeeUserService;
    }
    async getDetails(employeeCode) {
        const res = {};
        try {
            res.data = await this.employeeUserService.getByEmployeeCode(employeeCode);
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
            res.data = await this.employeeUserService.getPagination(params);
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
            res.data = await this.employeeUserService.create(dto);
            res.success = true;
            res.message = `Employee User ${api_response_constant_1.REGISTER_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async createFromEmployee(dto) {
        const res = {};
        try {
            res.data = await this.employeeUserService.createFromEmployee(dto);
            res.success = true;
            res.message = `Employee User ${api_response_constant_1.REGISTER_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(employeeCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeUserService.update(employeeCode, dto);
            res.success = true;
            res.message = `Employee User ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateProfile(employeeCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeUserService.updateProfile(employeeCode, dto);
            res.success = true;
            res.message = `Employee Profile ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(employeeCode) {
        const res = {};
        try {
            res.data = await this.employeeUserService.delete(employeeCode);
            res.success = true;
            res.message = `Employee User ${api_response_constant_1.DELETE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updatePassword(employeeCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeUserService.updatePassword(employeeCode, dto);
            res.success = true;
            res.message = `Employee User password ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async approveAccessRequest(employeeCode) {
        const res = {};
        try {
            res.data = await this.employeeUserService.approveAccessRequest(employeeCode);
            res.success = true;
            res.message = `Employee User ${api_response_constant_1.UPDATE_SUCCESS}`;
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
    (0, common_1.Get)("/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_user_create_dto_1.CreateEmployeeUserDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("createFromEmployee"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_user_create_dto_1.CreateEmployeeUserFromEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "createFromEmployee", null);
__decorate([
    (0, common_1.Put)("/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_user_update_dto_1.UpdateEmployeeUserDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("updateProfile/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_user_update_dto_1.UpdateEmployeeUserProfileDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Delete)("/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)("updatePassword/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reset_password_dto_1.UpdateUserResetPasswordDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)("approveAccessRequest/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserController.prototype, "approveAccessRequest", null);
EmployeeUserController = __decorate([
    (0, swagger_1.ApiTags)("employee-user"),
    (0, common_1.Controller)("employee-user"),
    __metadata("design:paramtypes", [employee_user_service_1.EmployeeUserService])
], EmployeeUserController);
exports.EmployeeUserController = EmployeeUserController;
//# sourceMappingURL=employee-user.controller.js.map