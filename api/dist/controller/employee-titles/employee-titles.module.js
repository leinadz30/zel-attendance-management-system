"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeTitlesModule = void 0;
const common_1 = require("@nestjs/common");
const employee_titles_controller_1 = require("./employee-titles.controller");
const EmployeeTitles_1 = require("../../db/entities/EmployeeTitles");
const employee_titles_service_1 = require("../../services/employee-titles.service");
const typeorm_1 = require("@nestjs/typeorm");
let EmployeeTitlesModule = class EmployeeTitlesModule {
};
EmployeeTitlesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([EmployeeTitles_1.EmployeeTitles])],
        controllers: [employee_titles_controller_1.EmployeeTitlesController],
        providers: [employee_titles_service_1.EmployeeTitlesService],
        exports: [employee_titles_service_1.EmployeeTitlesService],
    })
], EmployeeTitlesModule);
exports.EmployeeTitlesModule = EmployeeTitlesModule;
//# sourceMappingURL=employee-titles.module.js.map