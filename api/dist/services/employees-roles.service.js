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
exports.EmployeeRolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employees_roles_constant_1 = require("../common/constant/employees-roles.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const EmployeeRoles_1 = require("../db/entities/EmployeeRoles");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeeRolesService = class EmployeeRolesService {
    constructor(employeeRolesRepo) {
        this.employeeRolesRepo = employeeRolesRepo;
    }
    async getEmployeeRolesPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeRolesRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.employeeRolesRepo.count({
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
    async getByCode(employeeRoleCode) {
        var _a;
        const result = await this.employeeRolesRepo.findOne({
            select: {
                name: true,
                employeeRolesPages: true,
            },
            where: {
                employeeRoleCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(employees_roles_constant_1.EMPLOYEEROLES_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.employeeRolesRepo.manager.transaction(async (entityManager) => {
            let employeeRoles = new EmployeeRoles_1.EmployeeRoles();
            employeeRoles.name = dto.name;
            employeeRoles.employeeRoleAccess = dto.employeeRoleAccess;
            const school = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolId: dto.schoolId,
                    active: true,
                },
            });
            if (!school) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            employeeRoles.school = school;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeRoles.createdDate = timestamp;
            const createdByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.createdByUserId,
                    active: true,
                },
            });
            if (!createdByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeRoles.createdByUser = createdByUser;
            employeeRoles = await entityManager.save(employeeRoles);
            employeeRoles.employeeRoleCode = (0, utils_1.generateIndentityCode)(employeeRoles.employeeRoleId);
            employeeRoles = await entityManager.save(EmployeeRoles_1.EmployeeRoles, employeeRoles);
            delete employeeRoles.createdByUser.password;
            return employeeRoles;
        });
    }
    async update(employeeRoleCode, dto) {
        return await this.employeeRolesRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeRoles = await entityManager.findOne(EmployeeRoles_1.EmployeeRoles, {
                where: {
                    employeeRoleCode,
                    active: true,
                },
            });
            if (!employeeRoles) {
                throw Error(employees_roles_constant_1.EMPLOYEEROLES_ERROR_NOT_FOUND);
            }
            employeeRoles.name = dto.name;
            employeeRoles.employeeRoleAccess = dto.employeeRoleAccess;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            employeeRoles.updatedByUser = updatedByUser;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeRoles.updatedDate = timestamp;
            employeeRoles = await entityManager.save(EmployeeRoles_1.EmployeeRoles, employeeRoles);
            if ((_a = employeeRoles === null || employeeRoles === void 0 ? void 0 : employeeRoles.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeRoles.createdByUser.password;
            }
            if ((_b = employeeRoles === null || employeeRoles === void 0 ? void 0 : employeeRoles.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeRoles.updatedByUser.password;
            }
            return employeeRoles;
        });
    }
    async delete(employeeRoleCode) {
        return await this.employeeRolesRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let employeeRoles = await entityManager.findOne(EmployeeRoles_1.EmployeeRoles, {
                where: {
                    employeeRoleCode,
                    active: true,
                },
            });
            if (!employeeRoles) {
                throw Error(employees_roles_constant_1.EMPLOYEEROLES_ERROR_NOT_FOUND);
            }
            employeeRoles.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employeeRoles.updatedDate = timestamp;
            employeeRoles = await entityManager.save(EmployeeRoles_1.EmployeeRoles, employeeRoles);
            if ((_a = employeeRoles === null || employeeRoles === void 0 ? void 0 : employeeRoles.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete employeeRoles.createdByUser.password;
            }
            if ((_b = employeeRoles === null || employeeRoles === void 0 ? void 0 : employeeRoles.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete employeeRoles.updatedByUser.password;
            }
            return employeeRoles;
        });
    }
};
EmployeeRolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeRoles_1.EmployeeRoles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeRolesService);
exports.EmployeeRolesService = EmployeeRolesService;
//# sourceMappingURL=employees-roles.service.js.map