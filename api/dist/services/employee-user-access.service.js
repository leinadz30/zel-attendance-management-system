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
exports.EmployeeUserAccessService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_user_access_constant_1 = require("../common/constant/employee-user-access.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const EmployeeUserAccess_1 = require("../db/entities/EmployeeUserAccess");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeeUserAccessService = class EmployeeUserAccessService {
    constructor(employeeUserAccessRepo) {
        this.employeeUserAccessRepo = employeeUserAccessRepo;
    }
    async getEmployeeUserAccessPagination({ pageSize, pageIndex, order, columnDef, }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeUserAccessRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.employeeUserAccessRepo.count({
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
    async getByCode(employeeUserAccessCode) {
        var _a;
        const result = await this.employeeUserAccessRepo.findOne({
            where: {
                employeeUserAccessCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(employee_user_access_constant_1.EMPLOYEEUSERACCESS_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.employeeUserAccessRepo.manager.transaction(async (entityManager) => {
            let employeeUserAccess = new EmployeeUserAccess_1.EmployeeUserAccess();
            employeeUserAccess.name = dto.name;
            employeeUserAccess.accessPages = dto.accessPages;
            const school = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolId: dto.schoolId,
                    active: true,
                },
            });
            if (!school) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            employeeUserAccess.school = school;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeUserAccess.createdDate = timestamp;
            const createdByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.createdByUserId,
                    active: true,
                },
            });
            if (!createdByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeUserAccess.createdByUser = createdByUser;
            employeeUserAccess = await entityManager.save(employeeUserAccess);
            employeeUserAccess.employeeUserAccessCode = (0, utils_1.generateIndentityCode)(employeeUserAccess.employeeUserAccessId);
            employeeUserAccess = await entityManager.save(EmployeeUserAccess_1.EmployeeUserAccess, employeeUserAccess);
            delete employeeUserAccess.createdByUser.password;
            return employeeUserAccess;
        });
    }
    async update(employeeUserAccessCode, dto) {
        return await this.employeeUserAccessRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeUserAccess = await entityManager.findOne(EmployeeUserAccess_1.EmployeeUserAccess, {
                where: {
                    employeeUserAccessCode,
                    active: true,
                },
            });
            if (!employeeUserAccess) {
                throw Error(employee_user_access_constant_1.EMPLOYEEUSERACCESS_ERROR_NOT_FOUND);
            }
            employeeUserAccess.name = dto.name;
            employeeUserAccess.accessPages = dto.accessPages;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeUserAccess.updatedByUser = updatedByUser;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeUserAccess.updatedDate = timestamp;
            employeeUserAccess = await entityManager.save(EmployeeUserAccess_1.EmployeeUserAccess, employeeUserAccess);
            if ((_a = employeeUserAccess === null || employeeUserAccess === void 0 ? void 0 : employeeUserAccess.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeUserAccess.createdByUser.password;
            }
            if ((_b = employeeUserAccess === null || employeeUserAccess === void 0 ? void 0 : employeeUserAccess.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeUserAccess.updatedByUser.password;
            }
            return employeeUserAccess;
        });
    }
    async delete(employeeUserAccessCode) {
        return await this.employeeUserAccessRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeUserAccess = await entityManager.findOne(EmployeeUserAccess_1.EmployeeUserAccess, {
                where: {
                    employeeUserAccessCode,
                    active: true,
                },
            });
            if (!employeeUserAccess) {
                throw Error(employee_user_access_constant_1.EMPLOYEEUSERACCESS_ERROR_NOT_FOUND);
            }
            employeeUserAccess.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeUserAccess.updatedDate = timestamp;
            employeeUserAccess = await entityManager.save(EmployeeUserAccess_1.EmployeeUserAccess, employeeUserAccess);
            if ((_a = employeeUserAccess === null || employeeUserAccess === void 0 ? void 0 : employeeUserAccess.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeUserAccess.createdByUser.password;
            }
            if ((_b = employeeUserAccess === null || employeeUserAccess === void 0 ? void 0 : employeeUserAccess.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeUserAccess.updatedByUser.password;
            }
            return employeeUserAccess;
        });
    }
};
EmployeeUserAccessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeUserAccess_1.EmployeeUserAccess)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeUserAccessService);
exports.EmployeeUserAccessService = EmployeeUserAccessService;
//# sourceMappingURL=employee-user-access.service.js.map