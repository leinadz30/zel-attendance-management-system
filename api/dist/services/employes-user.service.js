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
exports.EmployeesUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departments_constant_1 = require("../common/constant/departments.constant");
const employee_titles_constant_1 = require("../common/constant/employee-titles.constant");
const employee_user_role_constant_1 = require("../common/constant/employee-user-role.constant");
const employees_constant_1 = require("../common/constant/employees.constant");
const school_year_levels_constant_1 = require("../common/constant/school-year-levels.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const utils_1 = require("../common/utils/utils");
const Departments_1 = require("../db/entities/Departments");
const EmployeeTitles_1 = require("../db/entities/EmployeeTitles");
const EmployeeUser_1 = require("../db/entities/EmployeeUser");
const EmployeeUserRole_1 = require("../db/entities/EmployeeUserRole");
const Employees_1 = require("../db/entities/Employees");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeesUserService = class EmployeesUserService {
    constructor(employeeUserRepo) {
        this.employeeUserRepo = employeeUserRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeUserRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    user: true,
                },
                skip,
                take,
                order,
            }),
            this.employeeUserRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results: results.map((x) => {
                delete x.user.password;
                return x;
            }),
            total,
        };
    }
    async createEmployeeUser(dto) {
        try {
            return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
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
                let user = new Users_1.Users();
                user.userType = user_type_constant_1.USER_TYPE.EMPLOYEE;
                user.userName = dto.userName;
                user.password = await (0, utils_1.hash)(dto.password);
                user = await entityManager.save(Users_1.Users, user);
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
                    throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
                }
                employee.employeePosition = employeePosition;
                employee = await entityManager.save(Employees_1.Employees, employee);
                employee.employeeCode = (0, utils_1.generateIndentityCode)(employee.employeeId);
                employee = await entityManager.save(Employees_1.Employees, employee);
                let employeeUser = new EmployeeUser_1.EmployeeUser();
                employeeUser.user = user;
                employeeUser.employee = employee;
                employeeUser.dateRegistered = timestamp;
                const employeeUserRole = await entityManager.findOne(EmployeeUserRole_1.EmployeeUserRole, {
                    where: {
                        employeeUserRoleId: dto.employeeUserRoleId,
                        school: {
                            schoolId: dto.schoolId,
                        },
                        active: true,
                    },
                });
                if (!employeeUserRole) {
                    throw Error(employee_user_role_constant_1.EMPLOYEEUSERROLE_ERROR_NOT_FOUND);
                }
                employeeUser.employeeUserRole = employeeUserRole;
                employeeUser = await entityManager.save(EmployeeUser_1.EmployeeUser, employeeUser);
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
                        employeeUser: {
                            user: true,
                            employeeUserRole: true,
                        },
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
            else {
                throw ex;
            }
        }
    }
    async updateProfile(employeeCode, dto) {
        try {
            return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
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
                        employeeUser: {
                            user: true,
                            employeeUserRole: true,
                        },
                    },
                });
                if (!employee) {
                    throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
                }
                employee.fullName = dto.fullName;
                employee.mobileNumber = dto.mobileNumber;
                employee.orgEmployeeId = dto.orgEmployeeId;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                employee.updatedDate = timestamp;
                employee.updatedByUser = (_a = employee.employeeUser) === null || _a === void 0 ? void 0 : _a.user;
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
                        employeeUser: {
                            user: true,
                            employeeUserRole: true,
                        },
                    },
                });
                (_b = employee.employeeUser) === null || _b === void 0 ? true : delete _b.user.password;
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
    async updateEmployeeUser(employeeCode, dto) {
        try {
            return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
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
                        employeeUser: {
                            user: true,
                            employeeUserRole: true,
                        },
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
                let employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeId: employee.employeeId,
                        },
                    },
                });
                const employeeUserRole = await entityManager.findOne(EmployeeUserRole_1.EmployeeUserRole, {
                    where: {
                        employeeUserRoleId: dto.employeeUserRoleId,
                        school: {
                            schoolId: employee.school.schoolId,
                        },
                        active: true,
                    },
                });
                if (!employeeUserRole) {
                    throw Error(employee_user_role_constant_1.EMPLOYEEUSERROLE_ERROR_NOT_FOUND);
                }
                employeeUser.employeeUserRole = employeeUserRole;
                employeeUser = await entityManager.save(EmployeeUser_1.EmployeeUser, employeeUser);
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
                        employeeUser: {
                            user: true,
                            employeeUserRole: true,
                        },
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
    async resetPassword(employeeCode, dto) {
        return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c, _d;
            let employee = await entityManager.findOne(Employees_1.Employees, {
                where: {
                    employeeCode,
                    active: true,
                },
                relations: {
                    employeeUser: {
                        user: true,
                    },
                },
            });
            if (!employee) {
                throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
            }
            const user = (_a = employee.employeeUser) === null || _a === void 0 ? void 0 : _a.user;
            user.password = await (0, utils_1.hash)(dto.password);
            await entityManager.save(Users_1.Users, user);
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
                    employeeUser: {
                        user: true,
                        employeeUserRole: true,
                    },
                },
            });
            (_c = (_b = employee.employeeUser) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? true : delete _c.password;
            delete employee.createdByUser.password;
            if ((_d = employee === null || employee === void 0 ? void 0 : employee.updatedByUser) === null || _d === void 0 ? void 0 : _d.password) {
                delete employee.updatedByUser.password;
            }
            return employee;
        });
    }
    async approveAccessRequest(employeeCode) {
        return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
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
                    employeeUser: {
                        user: true,
                        employeeUserRole: true,
                    },
                },
            });
            if (!employee) {
                throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
            }
            employee.accessGranted = true;
            await entityManager.save(Employees_1.Employees, employee);
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
                    employeeUser: {
                        user: true,
                        employeeUserRole: true,
                    },
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
EmployeesUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeUser_1.EmployeeUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeesUserService);
exports.EmployeesUserService = EmployeesUserService;
//# sourceMappingURL=employes-user.service.js.map