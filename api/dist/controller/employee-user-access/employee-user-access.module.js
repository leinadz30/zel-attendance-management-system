"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeUserAccessModule = void 0;
const common_1 = require("@nestjs/common");
const employee_user_access_controller_1 = require("./employee-user-access.controller");
const EmployeeUserAccess_1 = require("../../db/entities/EmployeeUserAccess");
const employee_user_access_service_1 = require("../../services/employee-user-access.service");
const typeorm_1 = require("@nestjs/typeorm");
let EmployeeUserAccessModule = class EmployeeUserAccessModule {
};
EmployeeUserAccessModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([EmployeeUserAccess_1.EmployeeUserAccess])],
        controllers: [employee_user_access_controller_1.EmployeeUserAccessController],
        providers: [employee_user_access_service_1.EmployeeUserAccessService],
        exports: [employee_user_access_service_1.EmployeeUserAccessService],
    })
], EmployeeUserAccessModule);
exports.EmployeeUserAccessModule = EmployeeUserAccessModule;
//# sourceMappingURL=employee-user-access.module.js.map