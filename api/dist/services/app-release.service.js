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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppReleaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("../common/utils/utils");
const AppRelease_1 = require("../db/entities/AppRelease");
const typeorm_2 = require("typeorm");
let AppReleaseService = class AppReleaseService {
    constructor(appReleaseRepo) {
        this.appReleaseRepo = appReleaseRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.appReleaseRepo.find({
                skip,
                take,
                order,
            }),
            this.appReleaseRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results,
            total,
        };
    }
    async getLatestVersion(appTypeCode) {
        const [result] = await this.appReleaseRepo.manager.query(`
    SELECT "Id" as "id", 
    "Description" as "description", 
    "AppTypeCode" as "appTypeCode", 
    "AppVersion" as "appVersion", 
    "AppBuild" as "appBuild", 
    "Date" as "date"
	FROM dbo."AppRelease" Where "AppTypeCode"='${appTypeCode}' ORDER BY "Date" DESC Limit 1;
      `);
        if (result) {
            return {
                id: result.id,
                description: result.description,
                appTypeCode: result.appTypeCode,
                appVersion: result.appVersion,
                appBuild: result.appBuild,
                date: (0, moment_1.default)(result.date).format("YYYY-MM-DD"),
            };
        }
        else {
            throw Error("Not found");
        }
    }
    async getByCode(id) {
        const result = await this.appReleaseRepo.findOne({
            where: {
                id,
            },
        });
        if (!result) {
            throw Error("Not found");
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.appReleaseRepo.manager.transaction(async (entityManager) => {
                let appRelease = new AppRelease_1.AppRelease();
                appRelease.description = dto.description;
                appRelease.appTypeCode = dto.appTypeCode.toUpperCase();
                appRelease.appVersion = dto.appVersion;
                appRelease.appBuild = dto.appBuild;
                appRelease.date = (0, moment_1.default)(dto.date).format("YYYY-MM-DD");
                appRelease = await entityManager.save(appRelease);
                return appRelease;
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    async update(id, dto) {
        try {
            return await this.appReleaseRepo.manager.transaction(async (entityManager) => {
                let appRelease = await entityManager.findOne(AppRelease_1.AppRelease, {
                    where: {
                        id,
                    },
                });
                appRelease.description = dto.description;
                appRelease.appTypeCode = dto.appTypeCode.toUpperCase();
                appRelease.appVersion = dto.appVersion;
                appRelease.appBuild = dto.appBuild;
                appRelease.date = (0, moment_1.default)(dto.date).format("YYYY-MM-DD");
                appRelease = await entityManager.save(appRelease);
                return appRelease;
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    async delete(id) {
        try {
            return await this.appReleaseRepo.manager.transaction(async (entityManager) => {
                const appRelease = await entityManager.findOne(AppRelease_1.AppRelease, {
                    where: {
                        id,
                    },
                });
                await entityManager.delete(AppRelease_1.AppRelease, appRelease);
                return appRelease;
            });
        }
        catch (ex) {
            throw ex;
        }
    }
};
AppReleaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(AppRelease_1.AppRelease)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AppReleaseService);
exports.AppReleaseService = AppReleaseService;
//# sourceMappingURL=app-release.service.js.map