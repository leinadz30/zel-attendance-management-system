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
exports.TapLogsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const tap_logs_create_dto_1 = require("../../core/dto/tap-logs/tap-logs.create.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const tap_logs_service_1 = require("../../services/tap-logs.service");
let TapLogsController = class TapLogsController {
    constructor(tapLogsService) {
        this.tapLogsService = tapLogsService;
    }
    async getPaginated(params) {
        const res = {};
        try {
            res.data = await this.tapLogsService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getDetails(tapLogId) {
        const res = {};
        try {
            res.data = await this.tapLogsService.getById(tapLogId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getStudentsTapsByParentCode(parentCode, date = new Date()) {
        const res = {};
        try {
            res.data = await this.tapLogsService.getStudentsTapsByParentCode(parentCode, date);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getStudentsTapsByStudentCode(studentCode, date = new Date()) {
        const res = {};
        try {
            res.data = await this.tapLogsService.getStudentsTapsByStudentCode(studentCode, date);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(tapLogsDto) {
        const res = {};
        try {
            res.data = await this.tapLogsService.create(tapLogsDto);
            res.success = true;
            res.message = `Tap Logs ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async createBatch(tapLogsDtos) {
        const res = {};
        try {
            res.success = true;
            res.message = `Tap Logs ${api_response_constant_1.SAVING_SUCCESS}`;
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
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], TapLogsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Get)("/:tapLogId"),
    __param(0, (0, common_1.Param)("tapLogId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TapLogsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)("getStudentsTapsByParentCode/:parentCode"),
    (0, swagger_1.ApiQuery)({ name: "date", required: true, type: Date }),
    __param(0, (0, common_1.Param)("parentCode")),
    __param(1, (0, common_1.Query)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TapLogsController.prototype, "getStudentsTapsByParentCode", null);
__decorate([
    (0, common_1.Get)("getStudentsTapsByStudentCode/:studentCode"),
    (0, swagger_1.ApiQuery)({ name: "date", required: true, type: Date }),
    __param(0, (0, common_1.Param)("studentCode")),
    __param(1, (0, common_1.Query)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TapLogsController.prototype, "getStudentsTapsByStudentCode", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tap_logs_create_dto_1.CreateTapLogDto]),
    __metadata("design:returntype", Promise)
], TapLogsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({
        isArray: true,
        type: tap_logs_create_dto_1.CreateTapLogDto,
    }),
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TapLogsController.prototype, "createBatch", null);
TapLogsController = __decorate([
    (0, swagger_1.ApiTags)("tapLogs"),
    (0, common_1.Controller)("tapLogs"),
    __metadata("design:paramtypes", [tap_logs_service_1.TapLogsService])
], TapLogsController);
exports.TapLogsController = TapLogsController;
//# sourceMappingURL=tap-logs.controller.js.map