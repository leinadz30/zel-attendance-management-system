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
exports.EmployeeTitlesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const employee_titles_create_dto_1 = require("../../core/dto/employee-titles/employee-titles.create.dto");
const employee_titles_update_dto_1 = require("../../core/dto/employee-titles/employee-titles.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const employee_titles_service_1 = require("../../services/employee-titles.service");
let EmployeeTitlesController = class EmployeeTitlesController {
    constructor(employeeTitlesService) {
        this.employeeTitlesService = employeeTitlesService;
    }
    async getDetails(employeeTitleCode) {
        const res = {};
        try {
            res.data = await this.employeeTitlesService.getByCode(employeeTitleCode);
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
            res.data = await this.employeeTitlesService.getEmployeeTitlesPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(employeeTitlesDto) {
        const res = {};
        try {
            res.data = await this.employeeTitlesService.create(employeeTitlesDto);
            res.success = true;
            res.message = `Employee Titles ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async batchCreate(dtos) {
        const res = {};
        try {
            res.data = await this.employeeTitlesService.batchCreate(dtos);
            res.success = true;
            res.message = `Employee Titles ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(employeeTitleCode, dto) {
        const res = {};
        try {
            res.data = await this.employeeTitlesService.update(employeeTitleCode, dto);
            res.success = true;
            res.message = `Employee Titles ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(employeeTitleCode) {
        const res = {};
        try {
            res.data = await this.employeeTitlesService.delete(employeeTitleCode);
            res.success = true;
            res.message = `Employee Titles ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:employeeTitleCode"),
    __param(0, (0, common_1.Param)("employeeTitleCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeTitlesController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], EmployeeTitlesController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_titles_create_dto_1.CreateEmployeeTitleDto]),
    __metadata("design:returntype", Promise)
], EmployeeTitlesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], EmployeeTitlesController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Put)("/:employeeTitleCode"),
    __param(0, (0, common_1.Param)("employeeTitleCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_titles_update_dto_1.UpdateEmployeeTitleDto]),
    __metadata("design:returntype", Promise)
], EmployeeTitlesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:employeeTitleCode"),
    __param(0, (0, common_1.Param)("employeeTitleCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeTitlesController.prototype, "delete", null);
EmployeeTitlesController = __decorate([
    (0, swagger_1.ApiTags)("employeeTitles"),
    (0, common_1.Controller)("employeeTitles"),
    __metadata("design:paramtypes", [employee_titles_service_1.EmployeeTitlesService])
], EmployeeTitlesController);
exports.EmployeeTitlesController = EmployeeTitlesController;
//# sourceMappingURL=employee-titles.controller.js.map