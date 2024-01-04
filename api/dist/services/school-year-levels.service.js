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
exports.SchoolYearLevelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const school_year_levels_constant_1 = require("../common/constant/school-year-levels.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const SchoolYearLevels_1 = require("../db/entities/SchoolYearLevels");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let SchoolYearLevelsService = class SchoolYearLevelsService {
    constructor(schoolYearLevelsRepo) {
        this.schoolYearLevelsRepo = schoolYearLevelsRepo;
    }
    async getSchoolYearLevelsPagination({ pageSize, pageIndex, order, columnDef, }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.schoolYearLevelsRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    school: true,
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.schoolYearLevelsRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
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
    async getByCode(schoolYearLevelCode) {
        var _a;
        const result = await this.schoolYearLevelsRepo.findOne({
            where: {
                schoolYearLevelCode,
                active: true,
            },
            relations: {
                school: true,
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.schoolYearLevelsRepo.manager.transaction(async (entityManager) => {
                let schoolYearLevels = new SchoolYearLevels_1.SchoolYearLevels();
                schoolYearLevels.name = dto.name;
                schoolYearLevels.educationalStage =
                    dto.educationalStage.toUpperCase();
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                schoolYearLevels.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                schoolYearLevels.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                schoolYearLevels.createdByUser = createdByUser;
                schoolYearLevels = await entityManager.save(SchoolYearLevels_1.SchoolYearLevels, schoolYearLevels);
                schoolYearLevels.schoolYearLevelCode = (0, utils_1.generateIndentityCode)(schoolYearLevels.schoolYearLevelId);
                schoolYearLevels = await entityManager.save(SchoolYearLevels_1.SchoolYearLevels, schoolYearLevels);
                delete schoolYearLevels.createdByUser.password;
                return schoolYearLevels;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_school_year_level")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async update(schoolYearLevelCode, dto) {
        try {
            return await this.schoolYearLevelsRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                let schoolYearLevels = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                    where: {
                        schoolYearLevelCode,
                        active: true,
                    },
                });
                if (!schoolYearLevels) {
                    throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
                }
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                schoolYearLevels.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                schoolYearLevels.updatedByUser = updatedByUser;
                schoolYearLevels.name = dto.name;
                schoolYearLevels.educationalStage = dto.educationalStage;
                schoolYearLevels = await entityManager.save(SchoolYearLevels_1.SchoolYearLevels, schoolYearLevels);
                if ((_a = schoolYearLevels === null || schoolYearLevels === void 0 ? void 0 : schoolYearLevels.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete schoolYearLevels.createdByUser.password;
                }
                if ((_b = schoolYearLevels === null || schoolYearLevels === void 0 ? void 0 : schoolYearLevels.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete schoolYearLevels.updatedByUser.password;
                }
                return schoolYearLevels;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_school_year_level")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(schoolYearLevelCode) {
        return await this.schoolYearLevelsRepo.manager.transaction(async (entityManager) => {
            const schoolYearLevels = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                where: {
                    schoolYearLevelCode,
                    active: true,
                },
            });
            if (!schoolYearLevels) {
                throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
            }
            schoolYearLevels.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            schoolYearLevels.updatedDate = timestamp;
            return await entityManager.save(SchoolYearLevels_1.SchoolYearLevels, schoolYearLevels);
        });
    }
};
SchoolYearLevelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(SchoolYearLevels_1.SchoolYearLevels)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SchoolYearLevelsService);
exports.SchoolYearLevelsService = SchoolYearLevelsService;
//# sourceMappingURL=school-year-levels.service.js.map