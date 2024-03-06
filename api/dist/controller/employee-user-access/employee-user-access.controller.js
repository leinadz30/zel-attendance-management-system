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
exports.EmployeeUserAccessController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const employee_user_access_create_dto_1 = require("../../core/dto/employee-user-access/employee-user-access.create.dto");
const employee_user_access_update_dto_1 = require("../../core/dto/employee-user-access/employee-user-access.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const employee_user_access_service_1 = require("../../services/employee-user-access.service");
let EmployeeUserAccessController = class EmployeeUserAccessController {
    constructor(employeeUserAccessService) {
        this.employeeUserAccessService = employeeUserAccessService;
    }
    async getDetails(employeeUserAccessCode) {
        const res = {};
        try {
            res.data = await this.employeeUserAccessService.getByCode(employeeUserAccessCode);
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
                await this.employeeUserAccessService.getEmployeeUserAccessPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(employeeUserAccessDto) {
        const res = {};
        try {
            res.data = await this.employeeUserAccessService.create(employeeUserAccessDto);
            res.success = true;
            res.message = `Employee User Access ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(employeeUserAccessCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeUserAccessService.update(employeeUserAccessCode, dto);
            res.success = true;
            res.message = `Employee User Access ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(employeeUserAccessCode) {
        const res = {};
        try {
            res.data = await this.employeeUserAccessService.delete(employeeUserAccessCode);
            res.success = true;
            res.message = `Employee User Access ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:employeeUserAccessCode"),
    __param(0, (0, common_1.Param)("employeeUserAccessCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserAccessController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserAccessController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_user_access_create_dto_1.CreateEmployeeUserAccessDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserAccessController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:employeeUserAccessCode"),
    __param(0, (0, common_1.Param)("employeeUserAccessCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_user_access_update_dto_1.UpdateEmployeeUserAccessDto]),
    __metadata("design:returntype", Promise)
], EmployeeUserAccessController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:employeeUserAccessCode"),
    __param(0, (0, common_1.Param)("employeeUserAccessCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeUserAccessController.prototype, "delete", null);
EmployeeUserAccessController = __decorate([
    (0, swagger_1.ApiTags)("employeeUserAccess"),
    (0, common_1.Controller)("employeeUserAccess"),
    __metadata("design:paramtypes", [employee_user_access_service_1.EmployeeUserAccessService])
], EmployeeUserAccessController);
exports.EmployeeUserAccessController = EmployeeUserAccessController;
//# sourceMappingURL=employee-user-access.controller.js.map