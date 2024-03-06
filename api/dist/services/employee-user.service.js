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
exports.EmployeeUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departments_constant_1 = require("../common/constant/departments.constant");
const employee_titles_constant_1 = require("../common/constant/employee-titles.constant");
const employee_user_access_constant_1 = require("../common/constant/employee-user-access.constant");
const employee_user_constant_1 = require("../common/constant/employee-user.constant");
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
const EmployeeUserAccess_1 = require("../db/entities/EmployeeUserAccess");
const Employees_1 = require("../db/entities/Employees");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let EmployeeUserService = class EmployeeUserService {
    constructor(employeeUserRepo) {
        this.employeeUserRepo = employeeUserRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.employeeUserRepo.find({
                where: Object.assign({}, condition),
                relations: {
                    employee: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                    },
                    user: true,
                    employeeUserAccess: true,
                },
                skip,
                take,
                order,
            }),
            this.employeeUserRepo.count({
                where: Object.assign({}, condition),
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
    async getByEmployeeCode(employeeCode) {
        var _a, _b, _c, _d, _e;
        const res = await this.employeeUserRepo.findOne({
            where: {
                employee: {
                    employeeCode,
                },
            },
            relations: {
                employee: {
                    department: true,
                    createdByUser: true,
                    updatedByUser: true,
                    school: true,
                    employeePosition: true,
                    employeeUser: {
                        user: true,
                        employeeUserAccess: true,
                    },
                },
                user: true,
                employeeUserAccess: true,
            },
        });
        if (!res) {
            throw Error(employees_constant_1.EMPLOYEES_ERROR_NOT_FOUND);
        }
        (_a = res === null || res === void 0 ? void 0 : res.user) === null || _a === void 0 ? true : delete _a.password;
        (_b = res === null || res === void 0 ? void 0 : res.employee) === null || _b === void 0 ? true : delete _b.createdByUser.password;
        if ((_d = (_c = res === null || res === void 0 ? void 0 : res.employee) === null || _c === void 0 ? void 0 : _c.updatedByUser) === null || _d === void 0 ? void 0 : _d.password) {
            (_e = res === null || res === void 0 ? void 0 : res.employee) === null || _e === void 0 ? true : delete _e.updatedByUser.password;
        }
        return res;
    }
    async create(dto) {
        try {
            return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
                var _a;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolCode,
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
                user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
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
                            schoolId: dto.schoolCode,
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
                            schoolId: dto.schoolCode,
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
                const employeeUserAccess = await entityManager.findOne(EmployeeUserAccess_1.EmployeeUserAccess, {
                    where: {
                        employeeUserAccessId: dto.employeeUserAccessId,
                        school: {
                            schoolId: dto.schoolCode,
                        },
                        active: true,
                    },
                });
                if (!employeeUserAccess) {
                    throw Error(employee_user_access_constant_1.EMPLOYEEUSERACCESS_ERROR_NOT_FOUND);
                }
                employeeUser.employeeUserAccess = employeeUserAccess;
                employeeUser = await entityManager.save(EmployeeUser_1.EmployeeUser, employeeUser);
                employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeCode: employeeUser.employee.employeeCode,
                        },
                    },
                    relations: {
                        employee: {
                            department: true,
                            createdByUser: true,
                            updatedByUser: true,
                            school: true,
                            employeePosition: true,
                        },
                        user: true,
                        employeeUserAccess: true,
                    },
                });
                (_a = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user) === null || _a === void 0 ? true : delete _a.password;
                delete employeeUser.employee.createdByUser.password;
                return employeeUser;
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
    async createFromEmployee(dto) {
        try {
            return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
                var _a;
                const { employeeId } = dto;
                const employee = await entityManager.findOne(Employees_1.Employees, {
                    where: {
                        employeeId,
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
                    throw Error(employee_user_constant_1.EMPLOYEEUSER_ERROR_NOT_FOUND);
                }
                let user = new Users_1.Users();
                user.userType = user_type_constant_1.USER_TYPE.EMPLOYEE;
                user.userName = dto.userName;
                user.password = await (0, utils_1.hash)(dto.password);
                user = await entityManager.save(Users_1.Users, user);
                user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
                user = await entityManager.save(Users_1.Users, user);
                let employeeUser = new EmployeeUser_1.EmployeeUser();
                employeeUser.user = user;
                employeeUser.employee = employee;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                employeeUser.dateRegistered = timestamp;
                const employeeUserAccess = await entityManager.findOne(EmployeeUserAccess_1.EmployeeUserAccess, {
                    where: {
                        employeeUserAccessId: dto.employeeUserAccessId,
                        school: {
                            schoolId: employee.school.schoolId,
                        },
                        active: true,
                    },
                });
                if (!employeeUserAccess) {
                    throw Error(employee_user_access_constant_1.EMPLOYEEUSERACCESS_ERROR_NOT_FOUND);
                }
                employeeUser.employeeUserAccess = employeeUserAccess;
                employeeUser = await entityManager.save(EmployeeUser_1.EmployeeUser, employeeUser);
                employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeCode: employeeUser.employee.employeeCode,
                        },
                    },
                    relations: {
                        employee: {
                            department: true,
                            createdByUser: true,
                            updatedByUser: true,
                            school: true,
                            employeePosition: true,
                            employeeUser: {
                                user: true,
                                employeeUserAccess: true,
                            },
                        },
                        user: true,
                        employeeUserAccess: true,
                    },
                });
                (_a = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user) === null || _a === void 0 ? true : delete _a.password;
                delete employeeUser.employee.createdByUser.password;
                return employeeUser;
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
                var _a, _b;
                let employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeCode,
                        },
                    },
                    relations: {
                        employee: {
                            department: true,
                            createdByUser: true,
                            updatedByUser: true,
                            school: true,
                            employeePosition: true,
                            employeeUser: {
                                user: true,
                                employeeUserAccess: true,
                            },
                        },
                        employeeUserAccess: true,
                        user: true,
                    },
                });
                if (!employeeUser) {
                    throw Error(employee_user_constant_1.EMPLOYEEUSER_ERROR_NOT_FOUND);
                }
                let employee = employeeUser.employee;
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
                employee = await entityManager.save(Employees_1.Employees, employee);
                employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeCode: employeeUser.employee.employeeCode,
                        },
                    },
                    relations: {
                        employee: {
                            department: true,
                            createdByUser: true,
                            updatedByUser: true,
                            school: true,
                            employeePosition: true,
                            employeeUser: {
                                user: true,
                                employeeUserAccess: true,
                            },
                        },
                        user: true,
                        employeeUserAccess: true,
                    },
                });
                (_b = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user) === null || _b === void 0 ? true : delete _b.password;
                delete employeeUser.employee.createdByUser.password;
                return employeeUser;
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
    async update(employeeCode, dto) {
        try {
            return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
                var _a;
                let employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeCode,
                        },
                    },
                    relations: {
                        employee: {
                            department: true,
                            createdByUser: true,
                            updatedByUser: true,
                            school: true,
                            employeePosition: true,
                            employeeUser: {
                                user: true,
                                employeeUserAccess: true,
                            },
                        },
                        employeeUserAccess: true,
                        user: true,
                    },
                });
                if (!employeeUser) {
                    throw Error(employee_user_constant_1.EMPLOYEEUSER_ERROR_NOT_FOUND);
                }
                let employee = employeeUser.employee;
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
                const employeeUserAccess = await entityManager.findOne(EmployeeUserAccess_1.EmployeeUserAccess, {
                    where: {
                        employeeUserAccessId: dto.employeeUserAccessId,
                        school: {
                            schoolId: employee.school.schoolId,
                        },
                        active: true,
                    },
                });
                if (!employeeUserAccess) {
                    throw Error(employee_user_access_constant_1.EMPLOYEEUSERACCESS_ERROR_NOT_FOUND);
                }
                employeeUser.employeeUserAccess = employeeUserAccess;
                employeeUser = await entityManager.save(EmployeeUser_1.EmployeeUser, employeeUser);
                employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                    where: {
                        employee: {
                            employeeCode,
                        },
                    },
                    relations: {
                        employee: {
                            department: true,
                            createdByUser: true,
                            updatedByUser: true,
                            school: true,
                            employeePosition: true,
                            employeeUser: {
                                user: true,
                                employeeUserAccess: true,
                            },
                        },
                        user: true,
                        employeeUserAccess: true,
                    },
                });
                (_a = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user) === null || _a === void 0 ? true : delete _a.password;
                delete employeeUser.employee.createdByUser.password;
                return employeeUser;
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
    async updatePassword(employeeCode, dto) {
        return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
            var _a;
            let employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                where: {
                    employee: {
                        employeeCode,
                    },
                },
                relations: {
                    employee: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                        employeeUser: {
                            user: true,
                            employeeUserAccess: true,
                        },
                    },
                    employeeUserAccess: true,
                    user: true,
                },
            });
            if (!employeeUser) {
                throw Error(employee_user_constant_1.EMPLOYEEUSER_ERROR_NOT_FOUND);
            }
            const user = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user;
            user.password = await (0, utils_1.hash)(dto.password);
            await entityManager.save(Users_1.Users, user);
            employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                where: {
                    employee: {
                        employeeCode: employeeUser.employee.employeeCode,
                    },
                },
                relations: {
                    employee: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                        employeeUser: {
                            user: true,
                            employeeUserAccess: true,
                        },
                    },
                    user: true,
                    employeeUserAccess: true,
                },
            });
            (_a = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user) === null || _a === void 0 ? true : delete _a.password;
            delete employeeUser.employee.createdByUser.password;
            return employeeUser;
        });
    }
    async approveAccessRequest(employeeCode) {
        return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
            var _a;
            let employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                where: {
                    employee: {
                        employeeCode,
                    },
                },
                relations: {
                    employee: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                        employeeUser: {
                            user: true,
                            employeeUserAccess: true,
                        },
                    },
                    employeeUserAccess: true,
                    user: true,
                },
            });
            if (!employeeUser) {
                throw Error(employee_user_constant_1.EMPLOYEEUSER_ERROR_NOT_FOUND);
            }
            let employee = employeeUser.employee;
            employee.accessGranted = true;
            employee = await entityManager.save(Employees_1.Employees, employee);
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            employee.updatedDate = timestamp;
            employeeUser.dateRegistered = timestamp;
            employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                where: {
                    employee: {
                        employeeCode: employeeUser.employee.employeeCode,
                    },
                },
                relations: {
                    employee: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                        employeeUser: {
                            user: true,
                            employeeUserAccess: true,
                        },
                    },
                    user: true,
                    employeeUserAccess: true,
                },
            });
            (_a = employeeUser === null || employeeUser === void 0 ? void 0 : employeeUser.user) === null || _a === void 0 ? true : delete _a.password;
            delete employeeUser.employee.createdByUser.password;
            return employeeUser;
        });
    }
    async delete(employeeCode) {
        return await this.employeeUserRepo.manager.transaction(async (entityManager) => {
            const employeeUser = await entityManager.findOne(EmployeeUser_1.EmployeeUser, {
                where: {
                    employee: {
                        employeeCode,
                    },
                },
                relations: {
                    employee: {
                        department: true,
                        createdByUser: true,
                        updatedByUser: true,
                        school: true,
                        employeePosition: true,
                    },
                    employeeUserAccess: true,
                    user: true,
                },
            });
            if (!employeeUser) {
                throw Error(employee_user_constant_1.EMPLOYEEUSER_ERROR_NOT_FOUND);
            }
            const user = employeeUser.user;
            user.active = false;
            await entityManager.save(Users_1.Users, user);
            await entityManager.delete(EmployeeUser_1.EmployeeUser, employeeUser);
            return employeeUser;
        });
    }
};
EmployeeUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(EmployeeUser_1.EmployeeUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeUserService);
exports.EmployeeUserService = EmployeeUserService;
//# sourceMappingURL=employee-user.service.js.map