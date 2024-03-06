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
exports.EmployeesService = void 0;
const employee_titles_constant_1 = require("./../common/constant/employee-titles.constant");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departments_constant_1 = require("../common/constant/departments.constant");
const employees_constant_1 = require("../common/constant/employees.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Departments_1 = require("../db/entities/Departments");
const EmployeeTitles_1 = require("../db/entities/EmployeeTitles");
const EmployeeUser_1 = require("../db/entities/EmployeeUser");
const Employees_1 = require("../db/entities/Employees");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeesService = class EmployeesService {
    constructor(employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    department: true,
                    createdByUser: true,
                    updatedByUser: true,
                    school: true,
                    employeeUser: {
                        user: true,
                    },
                },
                skip,
                take,
                order,
            }),
            this.employeeRepo.count({
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
    async getByCode(employeeCode) {
        var _a, _b, _c;
        const res = await this.employeeRepo.findOne({
            where: {
                employeeCode,
                active: true,
            },
            relations: {
                department: true,
                createdByUser: true,
                updatedByUser: true,
                school: true,
                employeePosition: true,
            },
        });
        if (!res) {
            throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
        }
        (_b = (_a = res.employeeUser) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? true : delete _b.password;
        delete res.createdByUser.password;
        if ((_c = res === null || res === void 0 ? void 0 : res.updatedByUser) === null || _c === void 0 ? void 0 : _c.password) {
            delete res.updatedByUser.password;
        }
        return res;
    }
    async create(dto) {
        try {
            return await this.employeeRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                let employee = new Employees_1.Employees();
                employee.school = school;
                employee.accessGranted = true;
                employee.fullName = dto.fullName;
                employee.mobileNumber = dto.mobileNumber;
                employee.cardNumber = dto.cardNumber;
                employee.orgEmployeeId = dto.orgEmployeeId;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                employee.createdDate = timestamp;
                const registeredByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!registeredByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                employee.createdByUser = registeredByUser;
                if (dto.departmentId && dto.departmentId !== "") {
                    const department = await entityManager.findOne(Departments_1.Departments, {
                        where: {
                            departmentId: dto.departmentId,
                            school: {
                                schoolId: dto.schoolId,
                            },
                            active: true,
                        },
                    });
                    if (!department) {
                        throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
                    }
                    employee.department = department;
                }
                if (dto.departmentId && dto.departmentId !== "") {
                    const employeePosition = await entityManager.findOne(EmployeeTitles_1.EmployeeTitles, {
                        where: {
                            employeeTitleId: dto.employeeTitleId,
                            school: {
                                schoolId: dto.schoolId,
                            },
                            active: true,
                        },
                    });
                    if (!employeePosition) {
                        throw Error(employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND);
                    }
                    employee.employeePosition = employeePosition;
                }
                employee = await entityManager.save(Employees_1.Employees, employee);
                employee.employeeCode = (0, utils_1.generateIndentityCode)(employee.employeeId);
                employee = await entityManager.save(Employees_1.Employees, employee);
                employee = await entityManager.findOne(Employees_1.Employees, {
                    where: {
                        employeeCode: employee.employeeCode,
                        active: true,
                    },
                    relations: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                    },
                });
                (_b = (_a = employee.employeeUser) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? true : delete _b.password;
                delete employee.createdByUser.password;
                return employee;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_user")) {
                throw Error("Username already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_employees_number")) {
                throw Error("Mobile number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_employees_card")) {
                throw Error("Card number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].toLowerCase().includes("u_employees_orgemployeeid")) {
                throw Error("Employee Id already used!");
            }
            else {
                throw ex;
            }
        }
    }
    async createBatch(dtos) {
        try {
            return await this.employeeRepo.manager.transaction(async (entityManager) => {
                var _a, _b, _c;
                const success = [];
                const warning = [];
                const failed = [];
                for (const dto of dtos) {
                    try {
                        let hasWarning = false;
                        const school = await entityManager.findOne(Schools_1.Schools, {
                            where: {
                                orgSchoolCode: dto.orgSchoolCode,
                                active: true,
                            },
                        });
                        if (!school) {
                            throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                        }
                        let employee = await entityManager.findOne(Employees_1.Employees, {
                            where: {
                                orgEmployeeId: dto.orgEmployeeId,
                                school: {
                                    orgSchoolCode: dto.orgSchoolCode,
                                },
                                active: true,
                            },
                        });
                        if (!employee) {
                            employee = new Employees_1.Employees();
                        }
                        employee.school = school;
                        employee.accessGranted = true;
                        employee.fullName = dto.fullName;
                        employee.mobileNumber = dto.mobileNumber;
                        if (dto.cardNumber && dto.cardNumber !== "") {
                            employee.cardNumber = dto.cardNumber;
                        }
                        if (dto.orgEmployeeId && dto.orgEmployeeId !== "") {
                            employee.orgEmployeeId = dto.orgEmployeeId;
                        }
                        else {
                            employee.orgEmployeeId = `${dto.orgSchoolCode}${(_a = dto.fullName) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, "").toUpperCase()}}`;
                        }
                        const timestamp = await entityManager
                            .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                            .then((res) => {
                            return res[0]["timestamp"];
                        });
                        employee.createdDate = timestamp;
                        const registeredByUser = await entityManager.findOne(Users_1.Users, {
                            where: {
                                userId: dto.createdByUserId,
                                active: true,
                            },
                        });
                        if (!registeredByUser) {
                            throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                        }
                        employee.createdByUser = registeredByUser;
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
                                if (dto.orgEmployeeId && dto.orgEmployeeId !== "") {
                                    warning.push({
                                        orgEmployeeId: dto.orgEmployeeId,
                                        refId: dto.refId,
                                        comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                                    });
                                }
                                else {
                                    warning.push({
                                        refId: dto.refId,
                                        comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                                    });
                                }
                                hasWarning = true;
                            }
                            employee.department = department;
                        }
                        else {
                            if (dto.orgEmployeeId && dto.orgEmployeeId !== "") {
                                warning.push({
                                    orgEmployeeId: dto.orgEmployeeId,
                                    refId: dto.refId,
                                    comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                                });
                            }
                            else {
                                warning.push({
                                    refId: dto.refId,
                                    comments: `${departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND} ${dto.departmentName}`,
                                });
                            }
                            hasWarning = true;
                        }
                        if (dto.employeeTitleName && dto.employeeTitleName !== "") {
                            const employeePosition = (await entityManager
                                .createQueryBuilder("EmployeeTitles", "et")
                                .leftJoinAndSelect("et.school", "s")
                                .where("trim(upper(et.name)) = trim(upper(:employeeTitleName)) AND " +
                                "s.orgSchoolCode = :orgSchoolCode")
                                .setParameters({
                                employeeTitleName: dto.employeeTitleName,
                                orgSchoolCode: dto.orgSchoolCode,
                            })
                                .getOne());
                            if (!employeePosition) {
                                if (dto.orgEmployeeId && dto.orgEmployeeId !== "") {
                                    warning.push({
                                        orgEmployeeId: dto.orgEmployeeId,
                                        refId: dto.refId,
                                        comments: `${employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND} ${dto.employeeTitleName}`,
                                    });
                                }
                                else {
                                    warning.push({
                                        refId: dto.refId,
                                        comments: `${employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND} ${dto.employeeTitleName}`,
                                    });
                                }
                                hasWarning = true;
                            }
                            employee.employeePosition = employeePosition;
                        }
                        else {
                            if (dto.orgEmployeeId && dto.orgEmployeeId !== "") {
                                warning.push({
                                    orgEmployeeId: dto.orgEmployeeId,
                                    refId: dto.refId,
                                    comments: `${employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND} ${dto.employeeTitleName}`,
                                });
                            }
                            else {
                                warning.push({
                                    refId: dto.refId,
                                    comments: `${employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND} ${dto.employeeTitleName}`,
                                });
                            }
                            hasWarning = true;
                        }
                        employee = await entityManager.save(Employees_1.Employees, employee);
                        employee.employeeCode = (0, utils_1.generateIndentityCode)(employee.employeeId);
                        employee = await entityManager.save(Employees_1.Employees, employee);
                        employee = await entityManager.findOne(Employees_1.Employees, {
                            where: {
                                employeeCode: employee.employeeCode,
                                active: true,
                            },
                            relations: {
                                department: true,
                                createdByUser: true,
                                updatedByUser: true,
                                school: true,
                                employeePosition: true,
                            },
                        });
                        (_c = (_b = employee.employeeUser) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? true : delete _c.password;
                        delete employee.createdByUser.password;
                        if (!hasWarning) {
                            success.push({
                                orgEmployeeId: dto.orgEmployeeId,
                                refId: dto.refId,
                            });
                        }
                    }
                    catch (ex) {
                        failed.push({
                            orgEmployeeId: dto.orgEmployeeId,
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
    async update(employeeCode, dto) {
        try {
            return await this.employeeRepo.manager.transaction(async (entityManager) => {
                var _a, _b, _c;
                let employee = await entityManager.findOne(Employees_1.Employees, {
                    where: {
                        employeeCode,
                        active: true,
                    },
                    relations: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                    },
                });
                if (!employee) {
                    throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
                }
                employee.fullName = dto.fullName;
                employee.mobileNumber = dto.mobileNumber;
                employee.cardNumber = dto.cardNumber;
                employee.orgEmployeeId = dto.orgEmployeeId;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                employee.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                employee.updatedByUser = updatedByUser;
                const department = await entityManager.findOne(Departments_1.Departments, {
                    where: {
                        departmentId: dto.departmentId,
                        active: true,
                    },
                });
                if (!department) {
                    throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
                }
                employee.department = department;
                const employeePosition = await entityManager.findOne(EmployeeTitles_1.EmployeeTitles, {
                    where: {
                        employeeTitleId: dto.employeeTitleId,
                        school: {
                            schoolId: employee.school.schoolId,
                        },
                        active: true,
                    },
                });
                if (!employeePosition) {
                    throw Error(employee_titles_constant_1.EMPLOYEETITLES_ERROR_NOT_FOUND);
                }
                employee.employeePosition = employeePosition;
                employee = await entityManager.save(Employees_1.Employees, employee);
                employee = await entityManager.findOne(Employees_1.Employees, {
                    where: {
                        employeeCode,
                        active: true,
                    },
                    relations: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                    },
                });
                (_b = (_a = employee.employeeUser) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? true : delete _b.password;
                delete employee.createdByUser.password;
                if ((_c = employee === null || employee === void 0 ? void 0 : employee.updatedByUser) === null || _c === void 0 ? void 0 : _c.password) {
                    delete employee.updatedByUser.password;
                }
                return employee;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_user")) {
                throw Error("Username already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_employees_number")) {
                throw Error("Mobile number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_employees_card")) {
                throw Error("Card number already used!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(employeeCode) {
        return await this.employeeRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c;
            let employee = await entityManager.findOne(Employees_1.Employees, {
                where: {
                    employeeCode,
                    active: true,
                },
                relations: {
                    department: true,
                    createdByUser: true,
                    updatedByUser: true,
                    school: true,
                    employeePosition: true,
                },
            });
            if (!employee) {
                throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
            }
            employee.active = false;
            await entityManager.save(Employees_1.Employees, employee);
            const employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                where: {
                    employee: {
                        employeeId: employee.employeeId,
                    },
                },
                relations: {
                    user: true,
                },
            });
            if (employeeUser) {
                const user = employeeUser.user;
                user.active = false;
                await entityManager.save(Users_1.Users, user);
                await entityManager.delete(EmployeeUser_1.EmployeeUser, employeeUser);
            }
            employee = await entityManager.findOne(Employees_1.Employees, {
                where: {
                    employeeCode,
                },
                relations: {
                    department: true,
                    createdByUser: true,
                    updatedByUser: true,
                    school: true,
                    employeePosition: true,
                },
            });
            (_b = (_a = employee.employeeUser) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? true : delete _b.password;
            delete employee.createdByUser.password;
            if ((_c = employee === null || employee === void 0 ? void 0 : employee.updatedByUser) === null || _c === void 0 ? void 0 : _c.password) {
                delete employee.updatedByUser.password;
            }
            return employee;
        });
    }
};
EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Employees_1.Employees)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=employees.service.js.map