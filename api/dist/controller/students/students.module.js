"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsModule = void 0;
const common_1 = require("@nestjs/common");
const students_controller_1 = require("./students.controller");
const Students_1 = require("../../db/entities/Students");
const students_service_1 = require("../../services/students.service");
const typeorm_1 = require("@nestjs/typeorm");
let StudentsModule = class StudentsModule {
};
StudentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Students_1.Students])],
        controllers: [students_controller_1.StudentsController],
        providers: [students_service_1.StudentsService],
        exports: [students_service_1.StudentsService],
    })
], StudentsModule);
exports.StudentsModule = StudentsModule;
//# sourceMappingURL=students.module.js.map