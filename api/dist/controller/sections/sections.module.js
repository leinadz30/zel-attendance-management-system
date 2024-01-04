"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionsModule = void 0;
const common_1 = require("@nestjs/common");
const sections_controller_1 = require("./sections.controller");
const Sections_1 = require("../../db/entities/Sections");
const sections_service_1 = require("../../services/sections.service");
const typeorm_1 = require("@nestjs/typeorm");
let SectionsModule = class SectionsModule {
};
SectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Sections_1.Sections])],
        controllers: [sections_controller_1.SectionsController],
        providers: [sections_service_1.SectionsService],
        exports: [sections_service_1.SectionsService],
    })
], SectionsModule);
exports.SectionsModule = SectionsModule;
//# sourceMappingURL=sections.module.js.map