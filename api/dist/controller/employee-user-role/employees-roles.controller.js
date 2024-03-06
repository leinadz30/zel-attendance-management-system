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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUserRolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const employee_user_role_create_dto_1 = require("../../core/dto/employee-user-role/employee-user-role.create.dto");
const employee_user_role_update_dto_1 = require("../../core/dto/employee-user-role/employee-user-role.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const employees_roles_service_1 = require("src/services/employees-roles.service");
let EmployeeUserRolesController = class EmployeeUserRolesController {
    constructor(employeeRolesService) {
        this.employeeRolesService = employeeRolesService;
    }
    async getDetails(employeeRolesCode) {
        const res = {};
        try {
            res.data = await this.employeeRolesService.getByCode(employeeRolesCode);
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
            res.data = await this.employeeRolesService.getEmployeeUserRolesPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(employeeRolesDto) {
        const res = {};
        try {
            res.data = await this.employeeRolesService.create(employeeRolesDto);
            res.success = true;
            res.message = `Employee Roles ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(employeeRolesCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeRolesService.update(employeeRolesCode, dto);
            res.success = true;
            res.message = `Employee Roles ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(employeeRolesCode) {
        const res = {};
        try {
            res.data = await this.employeeRolesService.delete(employeeRolesCode);
            res.success = true;
            res.message = `Employee Roles ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:employeeRolesCode"),
    __param(0, (0, common_1.Param)("employeeRolesCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserRolesController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserRolesController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof employee_user_role_create_dto_1.CreateEmployeeUserRolesDto !== "undefined" && employee_user_role_create_dto_1.CreateEmployeeUserRolesDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], EmployeeUserRolesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:employeeRolesCode"),
    __param(0, (0, common_1.Param)("employeeRolesCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof employee_user_role_update_dto_1.UpdateEmployeeUserRolesDto !== "undefined" && employee_user_role_update_dto_1.UpdateEmployeeUserRolesDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], EmployeeUserRolesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:employeeRolesCode"),
    __param(0, (0, common_1.Param)("employeeRolesCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserRolesController.prototype, "delete", null);
EmployeeUserRolesController = __decorate([
    (0, swagger_1.ApiTags)("employeeRoles"),
    (0, common_1.Controller)("employeeRoles"),
    __metadata("design:paramtypes", [typeof (_a = typeof employees_roles_service_1.EmployeeUserRolesService !== "undefined" && employees_roles_service_1.EmployeeUserRolesService) === "function" ? _a : Object])
], EmployeeUserRolesController);
exports.EmployeeUserRolesController = EmployeeUserRolesController;
//# sourceMappingURL=employees-roles.controller.js.map