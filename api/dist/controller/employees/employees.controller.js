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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const employees_batch_create_dto_1 = require("../../core/dto/employees/employees.batch-create.dto");
const employees_create_dto_1 = require("../../core/dto/employees/employees.create.dto");
const employees_update_dto_1 = require("../../core/dto/employees/employees.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const employees_service_1 = require("../../services/employees.service");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    async getDetails(employeeCode) {
        const res = {};
        try {
            res.data = await this.employeesService.getByCode(employeeCode);
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
            res.data = await this.employeesService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(employeesDto) {
        const res = {};
        try {
            res.data = await this.employeesService.create(employeesDto);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async createEmployeeUser(employeesDto) {
        const res = {};
        try {
            res.data = await this.employeesService.createEmployeeUser(employeesDto);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async createBatch(employeeDtos) {
        const res = {};
        try {
            res.data = await this.employeesService.createBatch(employeeDtos);
            res.success = true;
            res.message = `Employee Batch Create Complete`;
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
            res.data = await this.employeesService.update(employeeCode, dto);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateEmployeeUser(employeeCode, dto) {
        const res = {};
        try {
            res.data = await this.employeesService.updateEmployeeUser(employeeCode, dto);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.UPDATE_SUCCESS}`;
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
            res.data = await this.employeesService.updateProfile(employeeCode, dto);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.UPDATE_SUCCESS}`;
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
            res.data = await this.employeesService.approveAccessRequest(employeeCode);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.UPDATE_SUCCESS}`;
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
            res.data = await this.employeesService.delete(employeeCode);
            res.success = true;
            res.message = `Employee ${api_response_constant_1.DELETE_SUCCESS}`;
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
], EmployeesController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employees_create_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("createEmployeeUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employees_create_dto_1.CreateEmployeeUserDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createEmployeeUser", null);
__decorate([
    (0, swagger_1.ApiBody)({
        isArray: true,
        type: employees_batch_create_dto_1.BatchCreateEmployeeDto,
    }),
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Put)("/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employees_update_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("updateEmployeeUser/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employees_update_dto_1.UpdateEmployeeUserDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "updateEmployeeUser", null);
__decorate([
    (0, common_1.Put)("updateProfile/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employees_update_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)("approveAccessRequest/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "approveAccessRequest", null);
__decorate([
    (0, common_1.Delete)("/:employeeCode"),
    __param(0, (0, common_1.Param)("employeeCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "delete", null);
EmployeesController = __decorate([
    (0, swagger_1.ApiTags)("employees"),
    (0, common_1.Controller)("employees"),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
exports.EmployeesController = EmployeesController;
//# sourceMappingURL=employees.controller.js.map