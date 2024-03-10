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
exports.DepartmentsService = void 0;
const Schools_1 = require("../db/entities/Schools");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departments_constant_1 = require("../common/constant/departments.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Departments_1 = require("../db/entities/Departments");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
const schools_constant_1 = require("../common/constant/schools.constant");
let DepartmentsService = class DepartmentsService {
    constructor(departmentsRepo) {
        this.departmentsRepo = departmentsRepo;
    }
    async getDepartmentsPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.departmentsRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.departmentsRepo.count({
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
    async getByCode(departmentCode) {
        var _a;
        const result = await this.departmentsRepo.findOne({
            where: {
                departmentCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.departmentsRepo.manager.transaction(async (entityManager) => {
                let departments = new Departments_1.Departments();
                departments.departmentName = dto.departmentName;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                departments.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                departments.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                departments.createdByUser = createdByUser;
                departments.type = dto.type;
                departments = await entityManager.save(departments);
                departments.departmentCode = (0, utils_1.generateIndentityCode)(departments.departmentId);
                departments = await entityManager.save(Departments_1.Departments, departments);
                delete departments.createdByUser.password;
                return departments;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_department")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async batchCreate(dtos) {
        return await this.departmentsRepo.manager.transaction(async (entityManager) => {
            const success = [];
            const warning = [];
            const failed = [];
            for (const dto of dtos) {
                try {
                    let department = await entityManager.findOne(Departments_1.Departments, {
                        where: {
                            departmentName: dto.departmentName,
                            school: {
                                orgSchoolCode: dto.orgSchoolCode,
                            },
                            active: true,
                        },
                    });
                    if (!department) {
                        department = new Departments_1.Departments();
                    }
                    department.departmentName = dto.departmentName;
                    const timestamp = await entityManager
                        .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                        .then((res) => {
                        return res[0]["timestamp"];
                    });
                    department.createdDate = timestamp;
                    const school = await entityManager.findOne(Schools_1.Schools, {
                        where: {
                            orgSchoolCode: dto.orgSchoolCode,
                            active: true,
                        },
                    });
                    if (!school) {
                        throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                    }
                    department.school = school;
                    const createdByUser = await entityManager.findOne(Users_1.Users, {
                        where: {
                            userId: dto.createdByUserId,
                            active: true,
                        },
                    });
                    if (!createdByUser) {
                        throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                    }
                    department.createdByUser = createdByUser;
                    department = await entityManager.save(department);
                    department.departmentCode = (0, utils_1.generateIndentityCode)(department.departmentId);
                    department = await entityManager.save(Departments_1.Departments, department);
                    delete department.createdByUser.password;
                    success.push({
                        departmentName: dto.departmentName,
                        refId: dto.refId,
                    });
                }
                catch (ex) {
                    failed.push({
                        departmentName: dto.departmentName,
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
    async update(departmentCode, dto) {
        try {
            return await this.departmentsRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                let departments = await entityManager.findOne(Departments_1.Departments, {
                    where: {
                        departmentCode,
                        active: true,
                    },
                });
                if (!departments) {
                    throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
                }
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                departments.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                departments.updatedByUser = updatedByUser;
                departments.departmentName = dto.departmentName;
                departments = await entityManager.save(Departments_1.Departments, departments);
                if ((_a = departments === null || departments === void 0 ? void 0 : departments.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete departments.createdByUser.password;
                }
                if ((_b = departments === null || departments === void 0 ? void 0 : departments.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete departments.updatedByUser.password;
                }
                return departments;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_department")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(departmentCode) {
        return await this.departmentsRepo.manager.transaction(async (entityManager) => {
            const departments = await entityManager.findOne(Departments_1.Departments, {
                where: {
                    departmentCode,
                    active: true,
                },
            });
            if (!departments) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            departments.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            departments.updatedDate = timestamp;
            return await entityManager.save(Departments_1.Departments, departments);
        });
    }
};
DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Departments_1.Departments)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartmentsService);
exports.DepartmentsService = DepartmentsService;
//# sourceMappingURL=departments.service.js.map