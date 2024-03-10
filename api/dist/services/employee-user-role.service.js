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
exports.EmployeeUserRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_user_role_constant_1 = require("../common/constant/employee-user-role.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const EmployeeUserRole_1 = require("../db/entities/EmployeeUserRole");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeeUserRoleService = class EmployeeUserRoleService {
    constructor(employeeUserRoleRepo) {
        this.employeeUserRoleRepo = employeeUserRoleRepo;
    }
    async getEmployeeUserRolePagination({ pageSize, pageIndex, order, columnDef, }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeUserRoleRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.employeeUserRoleRepo.count({
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
    async getByCode(employeeUserRoleCode) {
        var _a;
        const result = await this.employeeUserRoleRepo.findOne({
            where: {
                employeeUserRoleCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(employee_user_role_constant_1.EMPLOYEEUSERROLE_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.employeeUserRoleRepo.manager.transaction(async (entityManager) => {
            let employeeUserRole = new EmployeeUserRole_1.EmployeeUserRole();
            employeeUserRole.name = dto.name;
            employeeUserRole.accessPages = dto.accessPages;
            const school = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolId: dto.schoolId,
                    active: true,
                },
            });
            if (!school) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            employeeUserRole.school = school;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeUserRole.createdDate = timestamp;
            const createdByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.createdByUserId,
                    active: true,
                },
            });
            if (!createdByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeUserRole.createdByUser = createdByUser;
            employeeUserRole = await entityManager.save(employeeUserRole);
            employeeUserRole.employeeUserRoleCode = (0, utils_1.generateIndentityCode)(employeeUserRole.employeeUserRoleId);
            employeeUserRole = await entityManager.save(EmployeeUserRole_1.EmployeeUserRole, employeeUserRole);
            delete employeeUserRole.createdByUser.password;
            return employeeUserRole;
        });
    }
    async update(employeeUserRoleCode, dto) {
        return await this.employeeUserRoleRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeUserRole = await entityManager.findOne(EmployeeUserRole_1.EmployeeUserRole, {
                where: {
                    employeeUserRoleCode,
                    active: true,
                },
            });
            if (!employeeUserRole) {
                throw Error(employee_user_role_constant_1.EMPLOYEEUSERROLE_ERROR_NOT_FOUND);
            }
            employeeUserRole.name = dto.name;
            employeeUserRole.accessPages = dto.accessPages;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeUserRole.updatedByUser = updatedByUser;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeUserRole.updatedDate = timestamp;
            employeeUserRole = await entityManager.save(EmployeeUserRole_1.EmployeeUserRole, employeeUserRole);
            if ((_a = employeeUserRole === null || employeeUserRole === void 0 ? void 0 : employeeUserRole.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeUserRole.createdByUser.password;
            }
            if ((_b = employeeUserRole === null || employeeUserRole === void 0 ? void 0 : employeeUserRole.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeUserRole.updatedByUser.password;
            }
            return employeeUserRole;
        });
    }
    async delete(employeeUserRoleCode) {
        return await this.employeeUserRoleRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeUserRole = await entityManager.findOne(EmployeeUserRole_1.EmployeeUserRole, {
                where: {
                    employeeUserRoleCode,
                    active: true,
                },
            });
            if (!employeeUserRole) {
                throw Error(employee_user_role_constant_1.EMPLOYEEUSERROLE_ERROR_NOT_FOUND);
            }
            employeeUserRole.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeUserRole.updatedDate = timestamp;
            employeeUserRole = await entityManager.save(EmployeeUserRole_1.EmployeeUserRole, employeeUserRole);
            if ((_a = employeeUserRole === null || employeeUserRole === void 0 ? void 0 : employeeUserRole.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeUserRole.createdByUser.password;
            }
            if ((_b = employeeUserRole === null || employeeUserRole === void 0 ? void 0 : employeeUserRole.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeUserRole.updatedByUser.password;
            }
            return employeeUserRole;
        });
    }
};
EmployeeUserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeUserRole_1.EmployeeUserRole)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeUserRoleService);
exports.EmployeeUserRoleService = EmployeeUserRoleService;
//# sourceMappingURL=employee-user-role.service.js.map