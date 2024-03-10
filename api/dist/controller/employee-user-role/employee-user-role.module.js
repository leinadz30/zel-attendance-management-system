"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUserRolesModule = void 0;
const common_1 = require("@nestjs/common");
const employee_user_role_controller_1 = require("./employee-user-role.controller");
const EmployeeUserRole_1 = require("../../db/entities/EmployeeUserRole");
const employee_user_role_service_1 = require("../../services/employee-user-role.service");
const typeorm_1 = require("@nestjs/typeorm");
let EmployeeUserRolesModule = class EmployeeUserRolesModule {
};
EmployeeUserRolesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([EmployeeUserRole_1.EmployeeUserRole])],
        controllers: [employee_user_role_controller_1.EmployeeUserRoleController],
        providers: [employee_user_role_service_1.EmployeeUserRoleService],
        exports: [employee_user_role_service_1.EmployeeUserRoleService],
    })
], EmployeeUserRolesModule);
exports.EmployeeUserRolesModule = EmployeeUserRolesModule;
//# sourceMappingURL=employee-user-role.module.js.map