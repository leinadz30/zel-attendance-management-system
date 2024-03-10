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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../services/auth.service");
const login_dto_1 = require("../../core/dto/auth/login.dto");
const swagger_1 = require("@nestjs/swagger");
const api_response_constant_1 = require("../../common/constant/api-response.constant");
const register_employee_dto_1 = require("../../core/dto/auth/register-employee.dto");
const register_parent_dto_1 = require("../../core/dto/auth/register-parent.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerEmployee(dto) {
        const res = {};
        try {
            res.data = await this.authService.registerEmployee(dto);
            res.success = true;
            res.message = `${api_response_constant_1.REGISTER_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async registerParent(dto) {
        const res = {};
        try {
            res.data = await this.authService.registerParent(dto);
            res.success = true;
            res.message = `${api_response_constant_1.REGISTER_SUCCESS}`;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async loginOperator(loginUserDto) {
        const res = {};
        try {
            res.data = await this.authService.getOperatorsByCredentials(loginUserDto.userName, loginUserDto.password);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async loginEmployeeUser(loginUserDto) {
        const res = {};
        try {
            res.data = await this.authService.getEmployeeUserByCredentials(loginUserDto);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async loginParent(loginUserDto) {
        const res = {};
        try {
            res.data = await this.authService.getParentsByCredentials(loginUserDto.userName, loginUserDto.password);
            res.success = true;
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
    (0, common_1.Post)("register/employeeUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_employee_dto_1.RegisterEmployeeUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerEmployee", null);
__decorate([
    (0, common_1.Post)("register/parent"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_parent_dto_1.RegisterParentUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerParent", null);
__decorate([
    (0, common_1.Post)("login/operator"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginOperator", null);
__decorate([
    (0, common_1.Post)("login/employeeUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LogInOrgDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginEmployeeUser", null);
__decorate([
    (0, common_1.Post)("login/parent"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LogInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginParent", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map