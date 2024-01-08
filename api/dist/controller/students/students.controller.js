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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const students_create_dto_1 = require("../../core/dto/students/students.create.dto");
const students_update_dto_1 = require("../../core/dto/students/students.update.dto");
const pagination_params_dto_1 = require("../../core/dto/pagination-params.dto");
const students_service_1 = require("../../services/students.service");
const students_batch_create_dto_1 = require("../../core/dto/students/students.batch-create.dto");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    async getDetails(studentCode) {
        const res = {};
        try {
            res.data = await this.studentsService.getByCode(studentCode);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getByOrgStudentId(orgStudentId) {
        const res = {};
        try {
            res.data = await this.studentsService.getByOrgStudentId(orgStudentId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getByCardNumber(cardNumber) {
        const res = {};
        try {
            res.data = await this.studentsService.getByCardNumber(cardNumber);
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
            res.data = await this.studentsService.getPagination(params);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(studentsDto) {
        const res = {};
        try {
            res.data = await this.studentsService.create(studentsDto);
            res.success = true;
            res.message = `Student ${api_response_constant_1.SAVING_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async createBatch(studentDtos) {
        const res = {};
        try {
            res.data = await this.studentsService.createBatch(studentDtos);
            res.success = true;
            res.message = `Student Batch Create Complete`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(studentCode, dto) {
        const res = {};
        try {
            res.data = await this.studentsService.update(studentCode, dto);
            res.success = true;
            res.message = `Student ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async approveAccessRequest(studentCode) {
        const res = {};
        try {
            res.data = await this.studentsService.approveAccessRequest(studentCode);
            res.success = true;
            res.message = `Student ${api_response_constant_1.UPDATE_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(studentCode) {
        const res = {};
        try {
            res.data = await this.studentsService.delete(studentCode);
            res.success = true;
            res.message = `Student ${api_response_constant_1.DELETE_SUCCESS}`;
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
    (0, common_1.Get)("/:studentCode"),
    __param(0, (0, common_1.Param)("studentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Get)("getByOrgStudentId/:orgStudentId"),
    __param(0, (0, common_1.Param)("orgStudentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getByOrgStudentId", null);
__decorate([
    (0, common_1.Get)("getByCardNumber/:cardNumber"),
    __param(0, (0, common_1.Param)("cardNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getByCardNumber", null);
__decorate([
    (0, common_1.Post)("/page"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_params_dto_1.PaginationParamsDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "getPaginated", null);
__decorate([
    (0, common_1.Post)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [students_create_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBody)({
        isArray: true,
        type: students_batch_create_dto_1.BatchCreateStudentDto,
    }),
    (0, common_1.Post)("createBatch"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Put)("/:studentCode"),
    __param(0, (0, common_1.Param)("studentCode")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, students_update_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "update", null);
__decorate([
    (0, common_1.Put)("approveAccessRequest/:studentCode"),
    __param(0, (0, common_1.Param)("studentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "approveAccessRequest", null);
__decorate([
    (0, common_1.Delete)("/:studentCode"),
    __param(0, (0, common_1.Param)("studentCode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentsController.prototype, "delete", null);
StudentsController = __decorate([
    (0, swagger_1.ApiTags)("students"),
    (0, common_1.Controller)("students"),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
exports.StudentsController = StudentsController;
//# sourceMappingURL=students.controller.js.map