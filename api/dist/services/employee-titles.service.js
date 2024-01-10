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
exports.EmployeeTitlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_titles_constant_1 = require("../common/constant/employee-titles.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const EmployeeTitles_1 = require("../db/entities/EmployeeTitles");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeeTitlesService = class EmployeeTitlesService {
    constructor(employeeTitlesRepo) {
        this.employeeTitlesRepo = employeeTitlesRepo;
    }
    async getEmployeeTitlesPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeTitlesRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.employeeTitlesRepo.count({
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
    async getByCode(employeeTitleCode) {
        var _a;
        const result = await this.employeeTitlesRepo.findOne({
            where: {
                employeeTitleCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.employeeTitlesRepo.manager.transaction(async (entityManager) => {
            let employeeTitles = new EmployeeTitles_1.EmployeeTitles();
            employeeTitles.name = dto.name;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeTitles.createdDate = timestamp;
            const school = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolId: dto.schoolId,
                    active: true,
                },
            });
            if (!school) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            employeeTitles.school = school;
            const createdByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.createdByUserId,
                    active: true,
                },
            });
            if (!createdByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeTitles.createdByUser = createdByUser;
            employeeTitles = await entityManager.save(employeeTitles);
            employeeTitles.employeeTitleCode = (0, utils_1.generateIndentityCode)(employeeTitles.employeeTitleId);
            employeeTitles = await entityManager.save(EmployeeTitles_1.EmployeeTitles, employeeTitles);
            delete employeeTitles.createdByUser.password;
            return employeeTitles;
        });
    }
    async batchCreate(dtos) {
        try {
            return await this.employeeTitlesRepo.manager.transaction(async (entityManager) => {
                const success = [];
                const warning = [];
                const failed = [];
                for (const dto of dtos) {
                    try {
                        let employeeTitle = await entityManager.findOne(EmployeeTitles_1.EmployeeTitles, {
                            where: {
                                name: dto.name,
                                school: {
                                    orgSchoolCode: dto.orgSchoolCode,
                                },
                                active: true,
                            },
                        });
                        if (!employeeTitle) {
                            employeeTitle = new EmployeeTitles_1.EmployeeTitles();
                        }
                        employeeTitle.name = dto.name;
                        const timestamp = await entityManager
                            .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                            .then((res) => {
                            return res[0]["timestamp"];
                        });
                        employeeTitle.createdDate = timestamp;
                        const school = await entityManager.findOne(Schools_1.Schools, {
                            where: {
                                orgSchoolCode: dto.orgSchoolCode,
                                active: true,
                            },
                        });
                        if (!school) {
                            throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                        }
                        employeeTitle.school = school;
                        const createdByUser = await entityManager.findOne(Users_1.Users, {
                            where: {
                                userId: dto.createdByUserId,
                                active: true,
                            },
                        });
                        if (!createdByUser) {
                            throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                        }
                        employeeTitle.createdByUser = createdByUser;
                        employeeTitle = await entityManager.save(employeeTitle);
                        employeeTitle.employeeTitleCode = (0, utils_1.generateIndentityCode)(employeeTitle.employeeTitleId);
                        employeeTitle = await entityManager.save(EmployeeTitles_1.EmployeeTitles, employeeTitle);
                        delete employeeTitle.createdByUser.password;
                        success.push({
                            name: dto.name,
                            refId: dto.refId,
                        });
                    }
                    catch (ex) {
                        failed.push({
                            name: dto.name,
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
    async update(employeeTitleCode, dto) {
        return await this.employeeTitlesRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeTitles = await entityManager.findOne(EmployeeTitles_1.EmployeeTitles, {
                where: {
                    employeeTitleCode,
                    active: true,
                },
            });
            if (!employeeTitles) {
                throw Error(employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND);
            }
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeTitles.updatedDate = timestamp;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeTitles.updatedByUser = updatedByUser;
            employeeTitles.name = dto.name;
            employeeTitles = await entityManager.save(EmployeeTitles_1.EmployeeTitles, employeeTitles);
            if ((_a = employeeTitles === null || employeeTitles === void 0 ? void 0 : employeeTitles.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeTitles.createdByUser.password;
            }
            if ((_b = employeeTitles === null || employeeTitles === void 0 ? void 0 : employeeTitles.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeTitles.updatedByUser.password;
            }
            return employeeTitles;
        });
    }
    async delete(employeeTitleCode) {
        return await this.employeeTitlesRepo.manager.transaction(async (entityManager) => {
            const employeeTitles = await entityManager.findOne(EmployeeTitles_1.EmployeeTitles, {
                where: {
                    employeeTitleCode,
                    active: true,
                },
            });
            if (!employeeTitles) {
                throw Error(employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND);
            }
            employeeTitles.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeTitles.updatedDate = timestamp;
            return await entityManager.save(EmployeeTitles_1.EmployeeTitles, employeeTitles);
        });
    }
};
EmployeeTitlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeTitles_1.EmployeeTitles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeTitlesService);
exports.EmployeeTitlesService = EmployeeTitlesService;
//# sourceMappingURL=employee-titles.service.js.map