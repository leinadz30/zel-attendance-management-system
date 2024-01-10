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
exports.SectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schools_constant_1 = require("../common/constant/schools.constant");
const sections_constant_1 = require("../common/constant/sections.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Sections_1 = require("../db/entities/Sections");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
const Departments_1 = require("../db/entities/Departments");
const departments_constant_1 = require("../common/constant/departments.constant");
const SchoolYearLevels_1 = require("../db/entities/SchoolYearLevels");
const school_year_levels_constant_1 = require("../common/constant/school-year-levels.constant");
const Employees_1 = require("../db/entities/Employees");
let SectionsService = class SectionsService {
    constructor(sectionsRepo) {
        this.sectionsRepo = sectionsRepo;
    }
    async getSectionsPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.sectionsRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    school: true,
                    department: true,
                    adviserEmployee: true,
                    schoolYearLevel: true,
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.sectionsRepo.count({
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
    async getByCode(sectionCode) {
        var _a;
        const result = await this.sectionsRepo.findOne({
            where: {
                sectionCode,
                active: true,
            },
            relations: {
                school: true,
                department: true,
                adviserEmployee: true,
                schoolYearLevel: true,
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(sections_constant_1.SECTIONS_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.sectionsRepo.manager.transaction(async (entityManager) => {
            let sections = new Sections_1.Sections();
            sections.sectionName = dto.sectionName;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            sections.createdDate = timestamp;
            const school = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolId: dto.schoolId,
                    active: true,
                },
            });
            if (!school) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            sections.school = school;
            const adviserEmployee = await entityManager.findOne(Employees_1.Employees, {
                where: {
                    employeeId: dto.adviserEmployeeId,
                    active: true,
                },
            });
            if (!adviserEmployee) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            sections.adviserEmployee = adviserEmployee;
            const department = await entityManager.findOne(Departments_1.Departments, {
                where: {
                    departmentId: dto.departmentId,
                    active: true,
                },
            });
            if (!department) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            sections.department = department;
            const schoolYearLevel = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                where: {
                    schoolYearLevelId: dto.schoolYearLevelId,
                    active: true,
                },
            });
            if (!schoolYearLevel) {
                throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
            }
            sections.schoolYearLevel = schoolYearLevel;
            const createdByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.createdByUserId,
                    active: true,
                },
            });
            if (!createdByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            sections.createdByUser = createdByUser;
            sections = await entityManager.save(sections);
            sections.sectionCode = (0, utils_1.generateIndentityCode)(sections.sectionId);
            sections = await entityManager.save(Sections_1.Sections, sections);
            sections = await entityManager.findOne(Sections_1.Sections, {
                where: {
                    sectionId: sections.sectionId,
                    active: true,
                },
                relations: {
                    school: true,
                    department: true,
                    adviserEmployee: true,
                    schoolYearLevel: true,
                    createdByUser: true,
                    updatedByUser: true,
                },
            });
            delete sections.createdByUser.password;
            return sections;
        });
    }
    async batchCreate(dtos) {
        try {
            return await this.sectionsRepo.manager.transaction(async (entityManager) => {
                const success = [];
                const warning = [];
                const failed = [];
                for (const dto of dtos) {
                    try {
                        let hasWarning = false;
                        let sections = new Sections_1.Sections();
                        sections.sectionName = dto.sectionName;
                        const timestamp = await entityManager
                            .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                            .then((res) => {
                            return res[0]["timestamp"];
                        });
                        sections.createdDate = timestamp;
                        const school = await entityManager.findOne(Schools_1.Schools, {
                            where: {
                                orgSchoolCode: dto.orgSchoolCode,
                                active: true,
                            },
                        });
                        if (!school) {
                            throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                        }
                        sections.school = school;
                        const adviserEmployee = await entityManager.findOne(Employees_1.Employees, {
                            where: {
                                orgEmployeeId: dto.adviserOrgEmployeeId,
                                school: {
                                    orgSchoolCode: dto.orgSchoolCode,
                                },
                                active: true,
                            },
                        });
                        if (adviserEmployee) {
                            sections.adviserEmployee = adviserEmployee;
                        }
                        else {
                            warning.push({
                                sectionName: dto.sectionName,
                                refId: dto.refId,
                                comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                            });
                            hasWarning = true;
                        }
                        if (dto.departmentName && dto.departmentName !== "") {
                            const department = (await entityManager
                                .createQueryBuilder("Departments", "d")
                                .leftJoinAndSelect("d.school", "s")
                                .where("trim(upper(d.departmentName)) = trim(upper(:departmentName)) AND " +
                                "s.orgSchoolCode = :orgSchoolCode")
                                .setParameters({
                                departmentName: dto.departmentName,
                                orgSchoolCode: dto.orgSchoolCode,
                            })
                                .getOne());
                            if (!department) {
                                warning.push({
                                    sectionName: dto.sectionName,
                                    refId: dto.refId,
                                    comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                                });
                                hasWarning = true;
                            }
                            sections.department = department;
                        }
                        else {
                            warning.push({
                                sectionName: dto.sectionName,
                                refId: dto.refId,
                                comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                            });
                            hasWarning = true;
                        }
                        if (dto.schoolYearLevelName && dto.schoolYearLevelName !== "") {
                            const schoolYearLevel = (await entityManager
                                .createQueryBuilder("SchoolYearLevels", "syl")
                                .leftJoinAndSelect("syl.school", "s")
                                .where("trim(upper(syl.name)) = trim(upper(:schoolYearLevelName)) AND " +
                                "s.orgSchoolCode = :orgSchoolCode")
                                .setParameters({
                                schoolYearLevelName: dto.schoolYearLevelName,
                                orgSchoolCode: dto.orgSchoolCode,
                            })
                                .getOne());
                            if (!schoolYearLevel) {
                                warning.push({
                                    sectionName: dto.sectionName,
                                    refId: dto.refId,
                                    comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                                });
                                hasWarning = true;
                            }
                            sections.schoolYearLevel = schoolYearLevel;
                        }
                        else {
                            warning.push({
                                sectionName: dto.sectionName,
                                refId: dto.refId,
                                comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                            });
                            hasWarning = true;
                        }
                        const createdByUser = await entityManager.findOne(Users_1.Users, {
                            where: {
                                userId: dto.createdByUserId,
                                active: true,
                            },
                        });
                        if (!createdByUser) {
                            throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                        }
                        sections.createdByUser = createdByUser;
                        sections = await entityManager.save(sections);
                        sections.sectionCode = (0, utils_1.generateIndentityCode)(sections.sectionId);
                        sections = await entityManager.save(Sections_1.Sections, sections);
                        sections = await entityManager.findOne(Sections_1.Sections, {
                            where: {
                                sectionId: sections.sectionId,
                                active: true,
                            },
                            relations: {
                                school: true,
                                department: true,
                                adviserEmployee: true,
                                schoolYearLevel: true,
                                createdByUser: true,
                                updatedByUser: true,
                            },
                        });
                        delete sections.createdByUser.password;
                        success.push({
                            sectionName: dto.sectionName,
                            refId: dto.refId,
                        });
                    }
                    catch (ex) {
                        failed.push({
                            sectionName: dto.sectionName,
                            refId: dto.refId,
                            comments: ex === null || ex === void 0 ? void 0 : ex.message,
                        });
                    }
                }
                return {
                    success,
                    warning,
                    failed,
                };
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    async update(sectionCode, dto) {
        return await this.sectionsRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let sections = await entityManager.findOne(Sections_1.Sections, {
                where: {
                    sectionCode,
                    active: true,
                },
                relations: {
                    school: true,
                    department: true,
                    adviserEmployee: true,
                    schoolYearLevel: true,
                    createdByUser: true,
                    updatedByUser: true,
                },
            });
            if (!sections) {
                throw Error(sections_constant_1.SECTIONS_ERROR_NOT_FOUND);
            }
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            sections.updatedDate = timestamp;
            const adviserEmployee = await entityManager.findOne(Employees_1.Employees, {
                where: {
                    employeeId: dto.adviserEmployeeId,
                    active: true,
                },
            });
            if (!adviserEmployee) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            sections.adviserEmployee = adviserEmployee;
            const department = await entityManager.findOne(Departments_1.Departments, {
                where: {
                    departmentId: dto.departmentId,
                    active: true,
                },
            });
            if (!department) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            sections.department = department;
            const schoolYearLevel = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                where: {
                    schoolYearLevelId: dto.schoolYearLevelId,
                    active: true,
                },
            });
            if (!schoolYearLevel) {
                throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
            }
            sections.schoolYearLevel = schoolYearLevel;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            sections.updatedByUser = updatedByUser;
            sections.sectionName = dto.sectionName;
            sections = await entityManager.save(Sections_1.Sections, sections);
            sections = await entityManager.findOne(Sections_1.Sections, {
                where: {
                    sectionId: sections.sectionId,
                    active: true,
                },
                relations: {
                    school: true,
                    department: true,
                    adviserEmployee: true,
                    schoolYearLevel: true,
                    createdByUser: true,
                    updatedByUser: true,
                },
            });
            if ((_a = sections === null || sections === void 0 ? void 0 : sections.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete sections.createdByUser.password;
            }
            if ((_b = sections === null || sections === void 0 ? void 0 : sections.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete sections.updatedByUser.password;
            }
            return sections;
        });
    }
    async delete(sectionCode) {
        return await this.sectionsRepo.manager.transaction(async (entityManager) => {
            var _a;
            let sections = await entityManager.findOne(Sections_1.Sections, {
                where: {
                    sectionCode,
                    active: true,
                },
            });
            if (!sections) {
                throw Error(sections_constant_1.SECTIONS_ERROR_NOT_FOUND);
            }
            sections.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            sections.updatedDate = timestamp;
            sections = await entityManager.save(Sections_1.Sections, sections);
            sections = await entityManager.findOne(Sections_1.Sections, {
                where: {
                    sectionId: sections.sectionId,
                    active: true,
                },
                relations: {
                    school: true,
                    department: true,
                    adviserEmployee: true,
                    schoolYearLevel: true,
                    createdByUser: true,
                    updatedByUser: true,
                },
            });
            delete sections.createdByUser.password;
            if ((_a = sections === null || sections === void 0 ? void 0 : sections.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete sections.updatedByUser.password;
            }
            return sections;
        });
    }
};
SectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Sections_1.Sections)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SectionsService);
exports.SectionsService = SectionsService;
//# sourceMappingURL=sections.service.js.map