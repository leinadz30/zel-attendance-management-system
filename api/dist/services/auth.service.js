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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("../common/utils/utils");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const Users_1 = require("../db/entities/Users");
const auth_error_constant_1 = require("../common/constant/auth-error.constant");
const Employees_1 = require("../db/entities/Employees");
const Operators_1 = require("../db/entities/Operators");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const Departments_1 = require("../db/entities/Departments");
const Schools_1 = require("../db/entities/Schools");
const departments_constant_1 = require("../common/constant/departments.constant");
const school_year_levels_constant_1 = require("../common/constant/school-year-levels.constant");
const EmployeeTitles_1 = require("../db/entities/EmployeeTitles");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const Parents_1 = require("../db/entities/Parents");
const EmployeeUser_1 = require("../db/entities/EmployeeUser");
const Notifications_1 = require("../db/entities/Notifications");
let AuthService = class AuthService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async getOperatorsByCredentials(userName, password) {
        let operator = await this.userRepo.manager.findOne(Operators_1.Operators, {
            where: {
                user: {
                    userName,
                    active: true,
                }
            },
            relations: {
                user: true,
            }
        });
        if (!operator) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
        }
        const passwordMatch = await (0, utils_1.compare)(operator.user.password, password);
        if (!passwordMatch) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
        }
        if (!operator.accessGranted) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
        }
        delete operator.user.password;
        return operator;
    }
    async getEmployeesByCredentials({ userName, password, schoolCode }) {
        let employeeUser = await this.userRepo.manager.findOne(EmployeeUser_1.EmployeeUser, {
            where: {
                user: {
                    userName,
                    active: true,
                },
                employee: {
                    school: {
                        schoolCode
                    }
                }
            },
            relations: {
                user: true,
                employee: {
                    department: true,
                    createdByUser: true,
                    updatedByUser: true,
                    school: true,
                    employeePosition: true,
                    employeeUser: {
                        user: true,
                        employeeRole: true,
                    },
                },
            }
        });
        if (!employeeUser) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
        }
        const passwordMatch = await (0, utils_1.compare)(employeeUser.user.password, password);
        if (!passwordMatch) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
        }
        if (!employeeUser.employee.accessGranted) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
        }
        delete employeeUser.user.password;
        return employeeUser;
    }
    async getParentsByCredentials(userName, password) {
        var _a;
        const parent = await this.userRepo.manager.findOne(Parents_1.Parents, {
            where: {
                user: {
                    userName,
                }
            },
            relations: {
                parentStudents: true,
                registeredByUser: true,
                updatedByUser: true,
                user: {
                    userProfilePic: {
                        file: true,
                    },
                },
            }
        });
        if (!parent) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
        }
        const passwordMatch = await (0, utils_1.compare)(parent.user.password, password);
        if (!passwordMatch) {
            throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
        }
        delete parent.user.password;
        delete parent.registeredByUser.password;
        if ((_a = parent === null || parent === void 0 ? void 0 : parent.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete parent.updatedByUser.password;
        }
        const totalUnreadNotif = await this.userRepo.manager.count(Notifications_1.Notifications, {
            where: {
                forUser: {
                    userId: parent.user.userId,
                    active: true,
                },
                isRead: false,
            },
        });
        return Object.assign(Object.assign({}, parent), { totalUnreadNotif });
    }
    async getByCredentials({ userName, password }) {
        var _a, _b, _c, _d;
        try {
            let user = await this.userRepo.findOne({
                where: {
                    userName,
                    active: true,
                },
            });
            if (!user) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            const passwordMatch = await (0, utils_1.compare)(user.password, password);
            if (!passwordMatch) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_PASSWORD_INCORRECT);
            }
            if (user.userType === user_type_constant_1.USER_TYPE.PARENT) {
                const parent = await this.userRepo.manager.findOne(Parents_1.Parents, {
                    where: {
                        user: {
                            userId: user.userId,
                        }
                    },
                    relations: {
                        parentStudents: true,
                        registeredByUser: true,
                        updatedByUser: true,
                        user: true,
                    }
                });
                delete parent.user.password;
                delete parent.registeredByUser.password;
                if ((_a = parent === null || parent === void 0 ? void 0 : parent.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete parent.updatedByUser.password;
                }
                return parent;
            }
            else if (user.userType === user_type_constant_1.USER_TYPE.EMPLOYEE) {
                const employee = await this.userRepo.manager.findOne(Employees_1.Employees, {
                    where: {
                        employeeUser: {
                            user: {
                                userName
                            }
                        }
                    },
                    relations: {
                        createdByUser: true,
                        employeePosition: true,
                        school: true,
                        updatedByUser: true,
                        employeeUser: {
                            employeeRole: true,
                            user: true
                        },
                    }
                });
                if (!employee.accessGranted) {
                    throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
                }
                (_c = (_b = employee.employeeUser) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? true : delete _c.password;
                delete employee.createdByUser.password;
                if ((_d = employee === null || employee === void 0 ? void 0 : employee.updatedByUser) === null || _d === void 0 ? void 0 : _d.password) {
                    delete employee.updatedByUser.password;
                }
                return employee;
            }
            else if (user.userType === user_type_constant_1.USER_TYPE.OPERATOR) {
                const operator = await this.userRepo.manager.findOne(Operators_1.Operators, {
                    where: {
                        user: {
                            userId: user.userId,
                        }
                    },
                    relations: {
                        user: true,
                    }
                });
                if (!operator.accessGranted) {
                    throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
                }
                delete operator.user.password;
                return operator;
            }
            else {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USERTYPE_INCORRECT);
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async getUserById(userId) {
        var _a, _b;
        try {
            let user = await this.userRepo.findOne({
                where: {
                    userId,
                    active: true,
                },
            });
            if (!user) {
                throw Error(auth_error_constant_1.LOGIN_ERROR_USER_NOT_FOUND);
            }
            if (user.userType === user_type_constant_1.USER_TYPE.EMPLOYEE) {
                const employee = await this.userRepo.manager.findOne(Employees_1.Employees, {
                    where: {
                        employeeUser: {
                            user: {
                                userId: user.userId,
                            }
                        }
                    },
                    relations: {
                        createdByUser: true,
                        employeePosition: true,
                        school: true,
                        updatedByUser: true,
                        employeeUser: {
                            user: true,
                            employeeRole: true,
                        },
                    }
                });
                if (!employee.accessGranted) {
                    throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
                }
                delete employee.employeeUser.user.password;
                return (_a = employee.employeeUser) === null || _a === void 0 ? void 0 : _a.user;
            }
            else if (user.userType === user_type_constant_1.USER_TYPE.PARENT) {
                const parent = await this.userRepo.manager.findOne(Parents_1.Parents, {
                    where: {
                        user: {
                            userId: user.userId,
                        }
                    },
                    relations: {
                        parentStudents: true,
                        registeredByUser: true,
                        updatedByUser: true,
                        user: true,
                    }
                });
                delete parent.user.password;
                delete parent.registeredByUser.password;
                if ((_b = parent === null || parent === void 0 ? void 0 : parent.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete parent.updatedByUser.password;
                }
                return parent.user;
            }
            else {
                const operator = await this.userRepo.manager.findOne(Operators_1.Operators, {
                    where: {
                        user: {
                            userId: user.userId,
                        }
                    },
                    relations: {
                        user: true,
                    }
                });
                if (!operator.accessGranted) {
                    throw Error(auth_error_constant_1.LOGIN_ERROR_PENDING_ACCESS_REQUEST);
                }
                delete operator.user.password;
                return operator.user;
            }
        }
        catch (ex) {
            throw ex;
        }
    }
    async registerEmployee(dto) {
        try {
            return await this.userRepo.manager.transaction(async (entityManager) => {
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
                employee.accessGranted = false;
                employee.firstName = dto.firstName;
                employee.middleInitial = dto.middleInitial;
                employee.lastName = dto.lastName;
                employee.fullName = `${dto.firstName} ${dto.lastName}`;
                employee.mobileNumber = dto.mobileNumber;
                employee.cardNumber = dto.cardNumber;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                employee.createdDate = timestamp;
                employee.createdByUser = user;
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
                            employeeRole: true,
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
            else {
                throw ex;
            }
        }
    }
    async registerParent(dto) {
        try {
            return await this.userRepo.manager.transaction(async (entityManager) => {
                let user = new Users_1.Users();
                user.userType = user_type_constant_1.USER_TYPE.PARENT;
                user.userName = dto.userName;
                user.password = await (0, utils_1.hash)(dto.password);
                user = await entityManager.save(Users_1.Users, user);
                user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
                user = await entityManager.save(Users_1.Users, user);
                let parent = new Parents_1.Parents();
                parent.user = user;
                parent.firstName = dto.firstName;
                parent.middleInitial = dto.middleInitial;
                parent.lastName = dto.lastName;
                parent.fullName = `${dto.firstName} ${dto.lastName}`;
                parent.mobileNumber = dto.mobileNumber;
                parent.birthDate = (0, moment_1.default)(dto.birthDate.toString()).format("YYYY-MM-DD");
                parent.gender = dto.gender;
                parent.address = dto.address;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                parent.registrationDate = timestamp;
                parent.registeredByUser = user;
                parent = await entityManager.save(Parents_1.Parents, parent);
                parent.parentCode = (0, utils_1.generateIndentityCode)(parent.parentId);
                parent = await entityManager.save(Parents_1.Parents, parent);
                parent = await entityManager.findOne(Parents_1.Parents, {
                    where: {
                        parentCode: parent.parentCode,
                        active: true,
                    },
                    relations: {
                        parentStudents: true,
                        registeredByUser: true,
                        updatedByUser: true,
                        user: true,
                    },
                });
                delete parent.user.password;
                delete parent.registeredByUser.password;
                return parent;
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
                ex["message"].includes("u_parents_number")) {
                throw Error("Number already used!");
            }
            else {
                throw ex;
            }
        }
    }
    async registerOperator(dto) {
        try {
            return await this.userRepo.manager.transaction(async (entityManager) => {
                let user = new Users_1.Users();
                user.userType = user_type_constant_1.USER_TYPE.OPERATOR;
                user.userName = dto.userName;
                user.password = await (0, utils_1.hash)(dto.password);
                user = await entityManager.save(Users_1.Users, user);
                user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
                user = await entityManager.save(Users_1.Users, user);
                let operator = new Operators_1.Operators();
                operator.user = user;
                operator.accessGranted = false;
                operator.name = dto.name;
                operator = await entityManager.save(Operators_1.Operators, operator);
                operator.operatorCode = (0, utils_1.generateIndentityCode)(operator.operatorId);
                operator = await entityManager.save(Operators_1.Operators, operator);
                operator = await entityManager.findOne(Operators_1.Operators, {
                    where: {
                        operatorCode: operator.operatorCode,
                        active: true,
                    },
                    relations: {
                        user: true,
                    },
                });
                delete operator.user.password;
                return operator;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_user")) {
                throw Error("Username already used!");
            }
            else {
                throw ex;
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map