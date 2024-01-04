"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolYearLevelsModule = void 0;
const common_1 = require("@nestjs/common");
const school_year_levels_controller_1 = require("./school-year-levels.controller");
const SchoolYearLevels_1 = require("../../db/entities/SchoolYearLevels");
const school_year_levels_service_1 = require("../../services/school-year-levels.service");
const typeorm_1 = require("@nestjs/typeorm");
let SchoolYearLevelsModule = class SchoolYearLevelsModule {
};
SchoolYearLevelsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([SchoolYearLevels_1.SchoolYearLevels])],
        controllers: [school_year_levels_controller_1.SchoolYearLevelsController],
        providers: [school_year_levels_service_1.SchoolYearLevelsService],
        exports: [school_year_levels_service_1.SchoolYearLevelsService],
    })
], SchoolYearLevelsModule);
exports.SchoolYearLevelsModule = SchoolYearLevelsModule;
//# sourceMappingURL=school-year-levels.module.js.map