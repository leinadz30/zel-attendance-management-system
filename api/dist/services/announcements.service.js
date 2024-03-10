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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const announcements_constant_1 = require("../common/constant/announcements.constant");
const departments_constant_1 = require("../common/constant/departments.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Announcements_1 = require("../db/entities/Announcements");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let AnnouncementsService = class AnnouncementsService {
    constructor(announcementsRepo) {
        this.announcementsRepo = announcementsRepo;
    }
    async getAnnouncementsPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.announcementsRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.announcementsRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results: results.map((x) => {
                var _a;
                delete x.createdByUser.password;
                if ((_a = x === null || x === void 0 ? void 0 : x.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete x.updatedByUser.password;
                }
                return x;
            }),
            total,
        };
    }
    async getByCode(announcementCode) {
        var _a;
        const result = await this.announcementsRepo.findOne({
            where: {
                announcementCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(announcements_constant_1.ANNOUNCEMENTS_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.announcementsRepo.manager.transaction(async (entityManager) => {
                let announcements = new Announcements_1.Announcements();
                announcements.title = dto.title;
                announcements.description = dto.description;
                announcements.targetDate = dto.targetDate;
                announcements.targetType = dto.targetType;
                announcements.targetIds = dto.targetIds;
                announcements.scheduled = dto.scheduled;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                announcements.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                announcements.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                announcements.createdByUser = createdByUser;
                if (dto.action === "SEND") {
                    announcements.sent = true;
                }
                else {
                    announcements.draft = true;
                }
                announcements = await entityManager.save(announcements);
                announcements.announcementCode = (0, utils_1.generateIndentityCode)(announcements.announcementId);
                announcements = await entityManager.save(Announcements_1.Announcements, announcements);
                delete announcements.createdByUser.password;
                return announcements;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_announcement")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async update(announcementCode, dto) {
        try {
            return await this.announcementsRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                let announcements = await entityManager.findOne(Announcements_1.Announcements, {
                    where: {
                        announcementCode,
                        active: true,
                    },
                });
                if (!announcements) {
                    throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
                }
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                announcements.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                announcements.updatedByUser = updatedByUser;
                announcements.title = dto.title;
                announcements.description = dto.description;
                announcements.targetDate = dto.targetDate;
                announcements.targetType = dto.targetType;
                announcements.targetIds = dto.targetIds;
                announcements.scheduled = dto.scheduled;
                announcements = await entityManager.save(Announcements_1.Announcements, announcements);
                if ((_a = announcements === null || announcements === void 0 ? void 0 : announcements.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete announcements.createdByUser.password;
                }
                if ((_b = announcements === null || announcements === void 0 ? void 0 : announcements.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete announcements.updatedByUser.password;
                }
                return announcements;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_announcement")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(announcementCode) {
        return await this.announcementsRepo.manager.transaction(async (entityManager) => {
            const announcements = await entityManager.findOne(Announcements_1.Announcements, {
                where: {
                    announcementCode,
                    active: true,
                },
            });
            if (!announcements) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            announcements.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            announcements.updatedDate = timestamp;
            return await entityManager.save(Announcements_1.Announcements, announcements);
        });
    }
};
AnnouncementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Announcements_1.Announcements)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AnnouncementsService);
exports.AnnouncementsService = AnnouncementsService;
//# sourceMappingURL=announcements.service.js.map