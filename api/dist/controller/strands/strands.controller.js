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
exports.StrandsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const strands_create_dto_1 = require("../../core/dto/strands/strands.create.dto");
const strands_update_dto_1 = require("../../core/dto/strands/strands.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const strands_service_1 = require("../../services/strands.service");
let StrandsController = class StrandsController {
    constructor(strandsService) {
        this.strandsService = strandsService;
    }
    async getDetails(strandCode) {
        const res = {};
        try {
            res.data = await this.strandsService.getByCode(strandCode);
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
            res.data = await this.strandsService.getStrandsPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(strandsDto) {
        const res = {};
        try {
            res.data = await this.strandsService.create(strandsDto);
            res.success = true;
            res.message = `Strands ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(strandCode, dto) {
        const res = {};
        try {
            res.data = await this.strandsService.update(strandCode, dto);
            res.success = true;
            res.message = `Strands ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(strandCode) {
        const res = {};
        try {
            res.data = await this.strandsService.delete(strandCode);
            res.success = true;
            res.message = `Strands ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:strandCode"),
    __param(0, (0, common_1.Param)("strandCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrandsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], StrandsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [strands_create_dto_1.CreateStrandDto]),
    __metadata("design:returntype", Promise)
], StrandsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("/:strandCode"),
    __param(0, (0, common_1.Param)("strandCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, strands_update_dto_1.UpdateStrandDto]),
    __metadata("design:returntype", Promise)
], StrandsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("/:strandCode"),
    __param(0, (0, common_1.Param)("strandCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StrandsController.prototype, "delete", null);
StrandsController = __decorate([
    (0, swagger_1.ApiTags)("strands"),
    (0, common_1.Controller)("strands"),
    __metadata("design:paramtypes", [strands_service_1.StrandsService])
], StrandsController);
exports.StrandsController = StrandsController;
//# sourceMappingURL=strands.controller.js.map