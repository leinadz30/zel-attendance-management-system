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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const departments_create_dto_1 = require("../../core/dto/departments/departments.create.dto");
const departments_update_dto_1 = require("../../core/dto/departments/departments.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const departments_service_1 = require("../../services/departments.service");
let DepartmentsController = class DepartmentsController {
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async getDetails(departmentCode) {
        const res = {};
        try {
            res.data = await this.departmentsService.getByCode(departmentCode);
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
            res.data = await this.departmentsService.getDepartmentsPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(departmentsDto) {
        const res = {};
        try {
            res.data = await this.departmentsService.create(departmentsDto);
            res.success = true;
            res.message = `Departments ${api_response_constant_1.SAVING_SUCCESS}`;
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
            res.data = await this.departmentsService.batchCreate(dtos);
            res.success = true;
            res.message = `Departments Batch Create Complete`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(departmentCode, dto) {
        const res = {};
        try {
            res.data = await this.departmentsService.update(departmentCode, dto);
            res.success = true;
            res.message = `Departments ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(departmentCode) {
        const res = {};
        try {
            res.data = await this.departmentsService.delete(departmentCode);
            res.success = true;
            res.message = `Departments ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:departmentCode"),
    __param(0, (0, common_1.Param)("departmentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [departments_create_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({
        isArray: true,
        type: departments_create_dto_1.CreateDepartmentDto,
    }),
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Put)("/:departmentCode"),
    __param(0, (0, common_1.Param)("departmentCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, departments_update_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:departmentCode"),
    __param(0, (0, common_1.Param)("departmentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "delete", null);
DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)("departments"),
    (0, common_1.Controller)("departments"),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
exports.DepartmentsController = DepartmentsController;
//# sourceMappingURL=departments.controller.js.map