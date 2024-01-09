"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsModule = void 0;
const common_1 = require("@nestjs/common");
const announcements_controller_1 = require("./announcements.controller");
const Announcements_1 = require("../../db/entities/Announcements");
const announcements_service_1 = require("../../services/announcements.service");
const typeorm_1 = require("@nestjs/typeorm");
let AnnouncementsModule = class AnnouncementsModule {
};
AnnouncementsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Announcements_1.Announcements])],
        controllers: [announcements_controller_1.AnnouncementsController],
        providers: [announcements_service_1.AnnouncementsService],
        exports: [announcements_service_1.AnnouncementsService],
    })
], AnnouncementsModule);
exports.AnnouncementsModule = AnnouncementsModule;
//# sourceMappingURL=announcements.module.js.map