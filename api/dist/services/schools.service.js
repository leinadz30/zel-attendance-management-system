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
exports.SchoolsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let SchoolsService = class SchoolsService {
    constructor(schoolsRepo) {
        this.schoolsRepo = schoolsRepo;
    }
    async getSchoolsPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.schoolsRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    registeredByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.schoolsRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results: results.map((x) => {
                var _a;
                delete x.registeredByUser.password;
                if ((_a = x === null || x === void 0 ? void 0 : x.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete x.updatedByUser.password;
                }
                return x;
            }),
            total,
        };
    }
    async getByCode(schoolCode) {
        var _a;
        const result = await this.schoolsRepo.findOne({
            where: {
                schoolCode,
                active: true,
            },
            relations: {
                registeredByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
        }
        delete result.registeredByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async getByOrgCode(orgSchoolCode) {
        var _a;
        const result = await this.schoolsRepo.findOne({
            where: {
                orgSchoolCode,
                active: true,
            },
            relations: {
                registeredByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
        }
        delete result.registeredByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.schoolsRepo.manager.transaction(async (entityManager) => {
            let schools = new Schools_1.Schools();
            schools.orgSchoolCode = dto.orgSchoolCode;
            schools.schoolName = dto.schoolName;
            schools.schoolAddress = dto.schoolAddress;
            schools.schoolContactNumber = dto.schoolContactNumber;
            schools.schoolEmail = dto.schoolEmail;
            schools.studentsAllowableTimeLate = dto.studentsAllowableTimeLate;
            schools.studentsTimeLate = dto.studentsTimeLate;
            schools.restrictGuardianTime = dto.restrictGuardianTime;
            schools.employeesTimeBeforeSwipeIsAllowed =
                dto.employeesTimeBeforeSwipeIsAllowed;
            schools.employeesAllowableTimeLate = dto.employeesAllowableTimeLate;
            schools.employeesTimeLate = dto.employeesTimeLate;
            schools.timeBeforeSwipeIsAllowed = dto.timeBeforeSwipeIsAllowed;
            schools.smsNotificationForStaffEntry = dto.smsNotificationForStaffEntry;
            schools.smsNotificationForStudentBreakTime =
                dto.smsNotificationForStudentBreakTime;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            schools.dateRegistered = timestamp;
            const registeredByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.registeredByUserId,
                    active: true,
                },
            });
            if (!registeredByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            schools.registeredByUser = registeredByUser;
            schools = await entityManager.save(schools);
            schools.schoolCode = (0, utils_1.generateIndentityCode)(schools.schoolId);
            schools = await entityManager.save(Schools_1.Schools, schools);
            delete schools.registeredByUser.password;
            return schools;
        });
    }
    async batchCreate(dtos) {
        return await this.schoolsRepo.manager.transaction(async (entityManager) => {
            const schools = [];
            for (const dto of dtos) {
                let school = new Schools_1.Schools();
                school.orgSchoolCode = dto.orgSchoolCode;
                school.schoolName = dto.schoolName;
                school.schoolAddress = dto.schoolAddress;
                school.schoolContactNumber = dto.schoolContactNumber;
                school.schoolEmail = dto.schoolEmail;
                school.studentsAllowableTimeLate = dto.studentsAllowableTimeLate;
                school.studentsTimeLate = dto.studentsTimeLate;
                school.restrictGuardianTime = dto.restrictGuardianTime;
                school.employeesTimeBeforeSwipeIsAllowed =
                    dto.employeesTimeBeforeSwipeIsAllowed;
                school.employeesAllowableTimeLate = dto.employeesAllowableTimeLate;
                school.employeesTimeLate = dto.employeesTimeLate;
                school.timeBeforeSwipeIsAllowed = dto.timeBeforeSwipeIsAllowed;
                school.smsNotificationForStaffEntry = dto.smsNotificationForStaffEntry;
                school.smsNotificationForStudentBreakTime =
                    dto.smsNotificationForStudentBreakTime;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                school.dateRegistered = timestamp;
                const registeredByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.registeredByUserId,
                        active: true,
                    },
                });
                if (!registeredByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                school.registeredByUser = registeredByUser;
                school = await entityManager.save(school);
                school.schoolCode = (0, utils_1.generateIndentityCode)(school.schoolId);
                school = await entityManager.save(Schools_1.Schools, school);
                delete school.registeredByUser.password;
                schools.push(school);
            }
            return schools;
        });
    }
    async update(schoolCode, dto) {
        return await this.schoolsRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let schools = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolCode,
                    active: true,
                },
            });
            if (!schools) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            schools.orgSchoolCode = dto.orgSchoolCode;
            schools.schoolName = dto.schoolName;
            schools.schoolAddress = dto.schoolAddress;
            schools.schoolContactNumber = dto.schoolContactNumber;
            schools.schoolEmail = dto.schoolEmail;
            schools.studentsAllowableTimeLate = dto.studentsAllowableTimeLate;
            schools.studentsTimeLate = dto.studentsTimeLate;
            schools.restrictGuardianTime = dto.restrictGuardianTime;
            schools.employeesTimeBeforeSwipeIsAllowed =
                dto.employeesTimeBeforeSwipeIsAllowed;
            schools.employeesAllowableTimeLate = dto.employeesAllowableTimeLate;
            schools.employeesTimeLate = dto.employeesTimeLate;
            schools.timeBeforeSwipeIsAllowed = dto.timeBeforeSwipeIsAllowed;
            schools.smsNotificationForStaffEntry = dto.smsNotificationForStaffEntry;
            schools.smsNotificationForStudentBreakTime =
                dto.smsNotificationForStudentBreakTime;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            schools.dateUpdated = timestamp;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            schools.updatedByUser = updatedByUser;
            schools = await entityManager.save(Schools_1.Schools, schools);
            if ((_a = schools === null || schools === void 0 ? void 0 : schools.registeredByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete schools.registeredByUser.password;
            }
            if ((_b = schools === null || schools === void 0 ? void 0 : schools.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete schools.updatedByUser.password;
            }
            return schools;
        });
    }
    async delete(schoolCode) {
        return await this.schoolsRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let schools = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolCode,
                    active: true,
                },
            });
            if (!schools) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            schools.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            schools.dateUpdated = timestamp;
            schools = await entityManager.save(Schools_1.Schools, schools);
            if ((_a = schools === null || schools === void 0 ? void 0 : schools.registeredByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete schools.registeredByUser.password;
            }
            if ((_b = schools === null || schools === void 0 ? void 0 : schools.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete schools.updatedByUser.password;
            }
            return schools;
        });
    }
};
SchoolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Schools_1.Schools)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SchoolsService);
exports.SchoolsService = SchoolsService;
//# sourceMappingURL=schools.service.js.map