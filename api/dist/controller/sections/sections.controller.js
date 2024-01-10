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
exports.SectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const sections_create_dto_1 = require("../../core/dto/sections/sections.create.dto");
const sections_update_dto_1 = require("../../core/dto/sections/sections.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const sections_service_1 = require("../../services/sections.service");
let SectionsController = class SectionsController {
    constructor(sectionsService) {
        this.sectionsService = sectionsService;
    }
    async getDetails(sectionCode) {
        const res = {};
        try {
            res.data = await this.sectionsService.getByCode(sectionCode);
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
            res.data = await this.sectionsService.getSectionsPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(sectionsDto) {
        const res = {};
        try {
            res.data = await this.sectionsService.create(sectionsDto);
            res.success = true;
            res.message = `Sections ${api_response_constant_1.SAVING_SUCCESS}`;
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
            res.data = await this.sectionsService.batchCreate(dtos);
            res.success = true;
            res.message = `Sections Batch Create Complete`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(sectionCode, dto) {
        const res = {};
        try {
            res.data = await this.sectionsService.update(sectionCode, dto);
            res.success = true;
            res.message = `Sections ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(sectionCode) {
        const res = {};
        try {
            res.data = await this.sectionsService.delete(sectionCode);
            res.success = true;
            res.message = `Sections ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:sectionCode"),
    __param(0, (0, common_1.Param)("sectionCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sections_create_dto_1.CreateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({
        isArray: true,
        type: sections_create_dto_1.BatchCreateSectionDto,
    }),
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "batchCreate", null);
__decorate([
    (0, common_1.Put)("/:sectionCode"),
    __param(0, (0, common_1.Param)("sectionCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sections_update_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:sectionCode"),
    __param(0, (0, common_1.Param)("sectionCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SectionsController.prototype, "delete", null);
SectionsController = __decorate([
    (0, swagger_1.ApiTags)("sections"),
    (0, common_1.Controller)("sections"),
    __metadata("design:paramtypes", [sections_service_1.SectionsService])
], SectionsController);
exports.SectionsController = SectionsController;
//# sourceMappingURL=sections.controller.js.map