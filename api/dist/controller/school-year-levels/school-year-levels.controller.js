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
exports.SchoolYearLevelsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const school_year_levels_create_dto_1 = require("../../core/dto/school-year-levels/school-year-levels.create.dto");
const school_year_levels_update_dto_1 = require("../../core/dto/school-year-levels/school-year-levels.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const school_year_levels_service_1 = require("../../services/school-year-levels.service");
let SchoolYearLevelsController = class SchoolYearLevelsController {
    constructor(schoolYearLevelsService) {
        this.schoolYearLevelsService = schoolYearLevelsService;
    }
    async getDetails(schoolYearLevelCode) {
        const res = {};
        try {
            res.data = await this.schoolYearLevelsService.getByCode(schoolYearLevelCode);
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
                await this.schoolYearLevelsService.getSchoolYearLevelsPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(schoolYearLevelsDto) {
        const res = {};
        try {
            res.data = await this.schoolYearLevelsService.create(schoolYearLevelsDto);
            res.success = true;
            res.message = `School Year Levels ${api_response_constant_1.SAVING_SUCCESS}`;
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
            res.data = await this.schoolYearLevelsService.batchCreate(dtos);
            res.success = true;
            res.message = `School year level Batch Create Complete`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(schoolYearLevelCode, dto) {
        const res = {};
        try {
            res.data = await this.schoolYearLevelsService.update(schoolYearLevelCode, dto);
            res.success = true;
            res.message = `School Year Levels ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(schoolYearLevelCode) {
        const res = {};
        try {
            res.data = await this.schoolYearLevelsService.delete(schoolYearLevelCode);
            res.success = true;
            res.message = `School Year Levels ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:schoolYearLevelCode"),
    __param(0, (0, common_1.Param)("schoolYearLevelCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolYearLevelsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], SchoolYearLevelsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [school_year_levels_create_dto_1.CreateSchoolYearLevelDto]),
    __metadata("design:returntype", Promise)
], SchoolYearLevelsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SchoolYearLevelsController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Put)("/:schoolYearLevelCode"),
    __param(0, (0, common_1.Param)("schoolYearLevelCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, school_year_levels_update_dto_1.UpdateSchoolYearLevelDto]),
    __metadata("design:returntype", Promise)
], SchoolYearLevelsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:schoolYearLevelCode"),
    __param(0, (0, common_1.Param)("schoolYearLevelCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SchoolYearLevelsController.prototype, "delete", null);
SchoolYearLevelsController = __decorate([
    (0, swagger_1.ApiTags)("schoolYearLevels"),
    (0, common_1.Controller)("schoolYearLevels"),
    __metadata("design:paramtypes", [school_year_levels_service_1.SchoolYearLevelsService])
], SchoolYearLevelsController);
exports.SchoolYearLevelsController = SchoolYearLevelsController;
//# sourceMappingURL=school-year-levels.controller.js.map