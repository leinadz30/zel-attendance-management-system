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
exports.EmployeeUserRoleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const employee_user_role_create_dto_1 = require("../../core/dto/employee-user-role/employee-user-role.create.dto");
const employee_user_role_update_dto_1 = require("../../core/dto/employee-user-role/employee-user-role.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const employee_user_role_service_1 = require("../../services/employee-user-role.service");
let EmployeeUserRoleController = class EmployeeUserRoleController {
    constructor(employeeUserRoleService) {
        this.employeeUserRoleService = employeeUserRoleService;
    }
    async getDetails(employeeUserRoleCode) {
        const res = {};
        try {
            res.data = await this.employeeUserRoleService.getByCode(employeeUserRoleCode);
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
            res.data =
                await this.employeeUserRoleService.getEmployeeUserRolePagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(employeeUserRoleDto) {
        const res = {};
        try {
            res.data = await this.employeeUserRoleService.create(employeeUserRoleDto);
            res.success = true;
            res.message = `Employee User Role ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(employeeUserRoleCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeUserRoleService.update(employeeUserRoleCode, dto);
            res.success = true;
            res.message = `Employee User Role ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(employeeUserRoleCode) {
        const res = {};
        try {
            res.data = await this.employeeUserRoleService.delete(employeeUserRoleCode);
            res.success = true;
            res.message = `Employee User Role ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:employeeUserRoleCode"),
    __param(0, (0, common_1.Param)("employeeUserRoleCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserRoleController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserRoleController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_user_role_create_dto_1.CreateEmployeeUserRoleDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserRoleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:employeeUserRoleCode"),
    __param(0, (0, common_1.Param)("employeeUserRoleCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_user_role_update_dto_1.UpdateEmployeeUserRoleDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserRoleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:employeeUserRoleCode"),
    __param(0, (0, common_1.Param)("employeeUserRoleCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserRoleController.prototype, "delete", null);
EmployeeUserRoleController = __decorate([
    (0, swagger_1.ApiTags)("employeeUserRole"),
    (0, common_1.Controller)("employeeUserRole"),
    __metadata("design:paramtypes", [employee_user_role_service_1.EmployeeUserRoleService])
], EmployeeUserRoleController);
exports.EmployeeUserRoleController = EmployeeUserRoleController;
//# sourceMappingURL=employee-user-role.controller.js.map