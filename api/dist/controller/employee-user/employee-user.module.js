"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUserModule = void 0;
const common_1 = require("@nestjs/common");
const employee_user_controller_1 = require("./employee-user.controller");
const EmployeeUser_1 = require("../../db/entities/EmployeeUser");
const employee_user_service_1 = require("../../services/employee-user.service");
const typeorm_1 = require("@nestjs/typeorm");
let EmployeeUserModule = class EmployeeUserModule {
};
EmployeeUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([EmployeeUser_1.EmployeeUser])],
        controllers: [employee_user_controller_1.EmployeeUserController],
        providers: [employee_user_service_1.EmployeeUserService],
        exports: [employee_user_service_1.EmployeeUserService],
    })
], EmployeeUserModule);
exports.EmployeeUserModule = EmployeeUserModule;
//# sourceMappingURL=employee-user.module.js.map