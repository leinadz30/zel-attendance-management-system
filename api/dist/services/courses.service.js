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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const courses_constant_1 = require("../common/constant/courses.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Courses_1 = require("../db/entities/Courses");
const Schools_1 = require("../db/entities/Schools");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let CoursesService = class CoursesService {
    constructor(coursesRepo) {
        this.coursesRepo = coursesRepo;
    }
    async getCoursesPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.coursesRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.coursesRepo.count({
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
    async getByCode(courseCode) {
        var _a;
        const result = await this.coursesRepo.findOne({
            where: {
                courseCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.coursesRepo.manager.transaction(async (entityManager) => {
                let courses = new Courses_1.Courses();
                courses.name = dto.name;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                courses.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                courses.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                courses.createdByUser = createdByUser;
                courses = await entityManager.save(courses);
                courses.courseCode = (0, utils_1.generateIndentityCode)(courses.courseId);
                courses = await entityManager.save(Courses_1.Courses, courses);
                delete courses.createdByUser.password;
                return courses;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_course")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async update(courseCode, dto) {
        try {
            return await this.coursesRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                let courses = await entityManager.findOne(Courses_1.Courses, {
                    where: {
                        courseCode,
                        active: true,
                    },
                    relations: {
                        createdByUser: true,
                        updatedByUser: true,
                    },
                });
                if (!courses) {
                    throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
                }
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                courses.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                courses.updatedByUser = updatedByUser;
                courses.name = dto.name;
                courses = await entityManager.save(Courses_1.Courses, courses);
                if ((_a = courses === null || courses === void 0 ? void 0 : courses.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete courses.createdByUser.password;
                }
                if ((_b = courses === null || courses === void 0 ? void 0 : courses.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete courses.updatedByUser.password;
                }
                return courses;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_course")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(courseCode) {
        return await this.coursesRepo.manager.transaction(async (entityManager) => {
            var _a, _b;
            let courses = await entityManager.findOne(Courses_1.Courses, {
                where: {
                    courseCode,
                    active: true,
                },
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
            });
            if (!courses) {
                throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
            }
            courses.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            courses.updatedDate = timestamp;
            courses = await entityManager.save(Courses_1.Courses, courses);
            (_a = courses.createdByUser) === null || _a === void 0 ? true : delete _a.password;
            if ((_b = courses === null || courses === void 0 ? void 0 : courses.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                delete courses.updatedByUser.password;
            }
            return courses;
        });
    }
};
CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Courses_1.Courses)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CoursesService);
exports.CoursesService = CoursesService;
//# sourceMappingURL=courses.service.js.map