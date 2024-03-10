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
exports.SchoolsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const schools_create_dto_1 = require("../../core/dto/schools/schools.create.dto");
const schools_update_dto_1 = require("../../core/dto/schools/schools.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const schools_service_1 = require("../../services/schools.service");
let SchoolsController = class SchoolsController {
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    async getDetails(schoolCode) {
        const res = {};
        try {
            res.data = await this.schoolsService.getByCode(schoolCode);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getByOrgCode(orgSchoolCode) {
        const res = {};
        try {
            res.data = await this.schoolsService.getByOrgCode(orgSchoolCode);
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
            res.data = await this.schoolsService.getSchoolsPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(schoolsDto) {
        const res = {};
        try {
            res.data = await this.schoolsService.create(schoolsDto);
            res.success = true;
            res.message = `Schools ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async batchCreate(schoolsDtos) {
        const res = {};
        try {
            res.data = await this.schoolsService.batchCreate(schoolsDtos);
            res.success = true;
            res.message = `Schools ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(schoolCode, dto) {
        const res = {};
        try {
            res.data = await this.schoolsService.update(schoolCode, dto);
            res.success = true;
            res.message = `Schools ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(schoolCode) {
        const res = {};
        try {
            res.data = await this.schoolsService.delete(schoolCode);
            res.success = true;
            res.message = `Schools ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:schoolCode"),
    __param(0, (0, common_1.Param)("schoolCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)("getByOrgCode/:orgSchoolCode"),
    __param(0, (0, common_1.Param)("orgSchoolCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "getByOrgCode", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schools_create_dto_1.CreateSchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({
        isArray: true,
        type: schools_create_dto_1.CreateSchoolDto,
    }),
    (0, common_1.Post)("batchCreate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Put)("/:schoolCode"),
    __param(0, (0, common_1.Param)("schoolCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schools_update_dto_1.UpdateSchoolDto]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:schoolCode"),
    __param(0, (0, common_1.Param)("schoolCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolsController.prototype, "delete", null);
SchoolsController = __decorate([
    (0, swagger_1.ApiTags)("schools"),
    (0, common_1.Controller)("schools"),
    __metadata("design:paramtypes", [schools_service_1.SchoolsService])
], SchoolsController);
exports.SchoolsController = SchoolsController;
//# sourceMappingURL=schools.controller.js.map