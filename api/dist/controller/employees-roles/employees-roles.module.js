"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRolesModule = void 0;
const common_1 = require("@nestjs/common");
const employees_roles_controller_1 = require("./employees-roles.controller");
const EmployeeRoles_1 = require("../../db/entities/EmployeeRoles");
const employees_roles_service_1 = require("../../services/employees-roles.service");
const typeorm_1 = require("@nestjs/typeorm");
let EmployeeRolesModule = class EmployeeRolesModule {
};
EmployeeRolesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([EmployeeRoles_1.EmployeeRoles])],
        controllers: [employees_roles_controller_1.EmployeeRolesController],
        providers: [employees_roles_service_1.EmployeeRolesService],
        exports: [employees_roles_service_1.EmployeeRolesService],
    })
], EmployeeRolesModule);
exports.EmployeeRolesModule = EmployeeRolesModule;
//# sourceMappingURL=employees-roles.module.js.map