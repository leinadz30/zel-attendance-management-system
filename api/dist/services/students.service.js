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
exports.StudentsService = void 0;
const utils_1 = require("../common/utils/utils");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const courses_constant_1 = require("../common/constant/courses.constant");
const departments_constant_1 = require("../common/constant/departments.constant");
const educational_stage_constant_1 = require("../common/constant/educational-stage.constant");
const school_year_levels_constant_1 = require("../common/constant/school-year-levels.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const sections_constant_1 = require("../common/constant/sections.constant");
const strand_constant_1 = require("../common/constant/strand.constant");
const students_constant_1 = require("../common/constant/students.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const Courses_1 = require("../db/entities/Courses");
const Departments_1 = require("../db/entities/Departments");
const SchoolYearLevels_1 = require("../db/entities/SchoolYearLevels");
const Schools_1 = require("../db/entities/Schools");
const Sections_1 = require("../db/entities/Sections");
const Strands_1 = require("../db/entities/Strands");
const StudentCourse_1 = require("../db/entities/StudentCourse");
const StudentSection_1 = require("../db/entities/StudentSection");
const StudentStrand_1 = require("../db/entities/StudentStrand");
const Students_1 = require("../db/entities/Students");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let StudentsService = class StudentsService {
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.studentRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    parentStudents: true,
                    studentCourse: {
                        course: true,
                    },
                    studentStrand: {
                        strand: true,
                    },
                    department: true,
                    registeredByUser: true,
                    updatedByUser: true,
                    school: true,
                    schoolYearLevel: true,
                    studentSection: {
                        section: true,
                    },
                },
                skip,
                take,
                order,
            }),
            this.studentRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results: results.map((x) => {
                var _a;
                delete x.registeredByUser.password;
                if ((_a = x === null || x === void 0 ? void 0 : x.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete x.updatedByUser.password;
                }
                return x;
            }),
            total,
        };
    }
    async getByCode(studentCode) {
        var _a;
        const res = await this.studentRepo.findOne({
            where: {
                studentCode,
                active: true,
            },
            relations: {
                parentStudents: {
                    parent: true,
                },
                studentCourse: {
                    course: true,
                },
                studentStrand: {
                    strand: true,
                },
                department: true,
                registeredByUser: true,
                updatedByUser: true,
                school: true,
                schoolYearLevel: true,
                studentSection: {
                    section: true,
                },
            },
        });
        if (!res) {
            throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
        }
        delete res.registeredByUser.password;
        if ((_a = res === null || res === void 0 ? void 0 : res.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete res.updatedByUser.password;
        }
        return res;
    }
    async getByOrgStudentId(orgStudentId) {
        var _a;
        const res = await this.studentRepo.findOne({
            where: {
                orgStudentId,
                active: true,
            },
            relations: {
                parentStudents: {
                    parent: true,
                },
                studentCourse: {
                    course: true,
                },
                studentStrand: {
                    strand: true,
                },
                department: true,
                registeredByUser: true,
                updatedByUser: true,
                school: true,
                schoolYearLevel: true,
                studentSection: {
                    section: true,
                },
            },
        });
        if (!res) {
            throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
        }
        delete res.registeredByUser.password;
        if ((_a = res === null || res === void 0 ? void 0 : res.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete res.updatedByUser.password;
        }
        return res;
    }
    async create(dto) {
        try {
            return await this.studentRepo.manager.transaction(async (entityManager) => {
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                let student = new Students_1.Students();
                student.school = school;
                student.accessGranted = true;
                student.firstName = dto.firstName;
                student.middleInitial = dto.middleInitial;
                student.lastName = dto.lastName;
                student.fullName = `${dto.firstName} ${dto.lastName}`;
                student.email = dto.email;
                student.mobileNumber = dto.mobileNumber;
                student.cardNumber = dto.cardNumber;
                student.address = dto.address;
                student.orgStudentId = dto.orgStudentId;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                student.registrationDate = timestamp;
                const registeredByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.registeredByUserId,
                        active: true,
                    },
                });
                if (!registeredByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                student.registeredByUser = registeredByUser;
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
                student.department = department;
                const schoolYearLevel = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                    where: {
                        schoolYearLevelId: dto.schoolYearLevelId,
                        school: {
                            schoolId: dto.schoolId,
                        },
                        active: true,
                    },
                });
                if (!schoolYearLevel) {
                    throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
                }
                student.schoolYearLevel = schoolYearLevel;
                student = await entityManager.save(Students_1.Students, student);
                student.studentCode = (0, utils_1.generateIndentityCode)(student.studentId);
                student = await entityManager.save(Students_1.Students, student);
                const studentSection = new StudentSection_1.StudentSection();
                studentSection.student = student;
                const section = await entityManager.findOne(Sections_1.Sections, {
                    where: {
                        sectionId: dto.sectionId,
                        active: true,
                    },
                });
                if (!section) {
                    throw Error(sections_constant_1.SECTIONS_ERROR_NOT_FOUND);
                }
                studentSection.section = section;
                await entityManager.save(StudentSection_1.StudentSection, studentSection);
                if (schoolYearLevel.educationalStage === educational_stage_constant_1.EDUCATIONAL_STAGE.COLLEGE) {
                    const studentCourse = new StudentCourse_1.StudentCourse();
                    studentCourse.student = student;
                    const course = await entityManager.findOne(Courses_1.Courses, {
                        where: {
                            courseId: dto.courseId,
                            active: true,
                        },
                    });
                    if (!course) {
                        throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
                    }
                    studentCourse.course = course;
                    await entityManager.save(StudentCourse_1.StudentCourse, studentCourse);
                }
                else if (schoolYearLevel.educationalStage === educational_stage_constant_1.EDUCATIONAL_STAGE.SENIOR) {
                    const studentStrand = new StudentStrand_1.StudentStrand();
                    studentStrand.student = student;
                    const strand = await entityManager.findOne(Strands_1.Strands, {
                        where: {
                            strandId: dto.strandId,
                            active: true,
                        },
                    });
                    if (!strand) {
                        throw Error(strand_constant_1.STRAND_ERROR_NOT_FOUND);
                    }
                    studentStrand.strand = strand;
                    await entityManager.save(StudentStrand_1.StudentStrand, studentStrand);
                }
                student = await entityManager.findOne(Students_1.Students, {
                    where: {
                        studentCode: student.studentCode,
                        active: true,
                    },
                    relations: {
                        parentStudents: {
                            parent: true,
                        },
                        studentCourse: {
                            course: true,
                        },
                        studentStrand: {
                            strand: true,
                        },
                        department: true,
                        registeredByUser: true,
                        updatedByUser: true,
                        school: true,
                        schoolYearLevel: true,
                        studentSection: {
                            section: true,
                        },
                    },
                });
                delete student.registeredByUser.password;
                return student;
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
                ex["message"].includes("u_students_card")) {
                throw Error("Student Card Number already used!");
            }
            else if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_student_orgstudentid")) {
                throw Error("Student Id already used!");
            }
            else {
                throw ex;
            }
        }
    }
    async createBatch(dtos) {
        try {
            return await this.studentRepo.manager.transaction(async (entityManager) => {
                const success = [];
                const duplicates = [];
                const failed = [];
                for (const dto of dtos) {
                    try {
                        const school = await entityManager.findOne(Schools_1.Schools, {
                            where: {
                                orgSchoolCode: dto.orgSchoolCode,
                                active: true,
                            },
                        });
                        if (!school) {
                            throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                        }
                        let student = await entityManager.findOne(Students_1.Students, {
                            where: {
                                orgStudentId: dto.orgStudentId,
                                school: {
                                    orgSchoolCode: dto.orgSchoolCode,
                                },
                                active: true,
                            },
                        });
                        if (!student) {
                            student = new Students_1.Students();
                            student.school = school;
                            student.accessGranted = true;
                            student.firstName = dto.firstName;
                            student.middleInitial = dto.middleInitial;
                            student.lastName = dto.lastName;
                            student.fullName = `${dto.firstName} ${dto.lastName}`;
                            student.email = dto.email;
                            student.mobileNumber = dto.mobileNumber;
                            student.cardNumber = dto.cardNumber;
                            student.address = dto.address;
                            student.orgStudentId = dto.orgStudentId;
                            const timestamp = await entityManager
                                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                                .then((res) => {
                                return res[0]["timestamp"];
                            });
                            student.registrationDate = timestamp;
                            const registeredByUser = await entityManager.findOne(Users_1.Users, {
                                where: {
                                    userId: dto.registeredByUserId,
                                    active: true,
                                },
                            });
                            if (!registeredByUser) {
                                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                            }
                            student.registeredByUser = registeredByUser;
                            const department = await entityManager.findOne(Departments_1.Departments, {
                                where: {
                                    departmentName: dto.departmentName,
                                    school: {
                                        orgSchoolCode: dto.orgSchoolCode,
                                    },
                                    active: true,
                                },
                            });
                            if (!department) {
                                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
                            }
                            student.department = department;
                            const schoolYearLevel = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                                where: {
                                    name: dto.schoolYearLeveName,
                                    school: {
                                        orgSchoolCode: dto.orgSchoolCode,
                                    },
                                    active: true,
                                },
                            });
                            if (!schoolYearLevel) {
                                throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
                            }
                            student.schoolYearLevel = schoolYearLevel;
                            student = await entityManager.save(Students_1.Students, student);
                            student.studentCode = (0, utils_1.generateIndentityCode)(student.studentId);
                            student = await entityManager.save(Students_1.Students, student);
                            const studentSection = new StudentSection_1.StudentSection();
                            studentSection.student = student;
                            const section = await entityManager.findOne(Sections_1.Sections, {
                                where: {
                                    sectionName: dto.sectionName,
                                    active: true,
                                    school: {
                                        orgSchoolCode: dto.orgSchoolCode,
                                    },
                                },
                            });
                            if (!section) {
                                throw Error(sections_constant_1.SECTIONS_ERROR_NOT_FOUND);
                            }
                            studentSection.section = section;
                            await entityManager.save(StudentSection_1.StudentSection, studentSection);
                            if (schoolYearLevel.educationalStage === educational_stage_constant_1.EDUCATIONAL_STAGE.COLLEGE) {
                                const studentCourse = new StudentCourse_1.StudentCourse();
                                studentCourse.student = student;
                                const course = await entityManager.findOne(Courses_1.Courses, {
                                    where: {
                                        name: dto.courseName,
                                        active: true,
                                    },
                                });
                                if (!course) {
                                    throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
                                }
                                studentCourse.course = course;
                                await entityManager.save(StudentCourse_1.StudentCourse, studentCourse);
                            }
                            else if (schoolYearLevel.educationalStage === educational_stage_constant_1.EDUCATIONAL_STAGE.SENIOR) {
                                const studentStrand = new StudentStrand_1.StudentStrand();
                                studentStrand.student = student;
                                const strand = await entityManager.findOne(Strands_1.Strands, {
                                    where: {
                                        name: dto.strandName,
                                        active: true,
                                    },
                                });
                                if (!strand) {
                                    throw Error(strand_constant_1.STRAND_ERROR_NOT_FOUND);
                                }
                                studentStrand.strand = strand;
                                await entityManager.save(StudentStrand_1.StudentStrand, studentStrand);
                            }
                            student = await entityManager.findOne(Students_1.Students, {
                                where: {
                                    studentCode: student.studentCode,
                                    active: true,
                                },
                                relations: {
                                    parentStudents: {
                                        parent: true,
                                    },
                                    studentCourse: {
                                        course: true,
                                    },
                                    studentStrand: {
                                        strand: true,
                                    },
                                    department: true,
                                    registeredByUser: true,
                                    updatedByUser: true,
                                    school: true,
                                    schoolYearLevel: true,
                                    studentSection: {
                                        section: true,
                                    },
                                },
                            });
                            delete student.registeredByUser.password;
                            success.push({
                                orgStudentId: dto.orgStudentId,
                                refId: dto.refId,
                            });
                        }
                        else {
                            duplicates.push({
                                orgStudentId: dto.orgStudentId,
                                refId: dto.refId,
                            });
                        }
                    }
                    catch (ex) {
                        failed.push({
                            orgStudentId: dto.orgStudentId,
                            refId: dto.refId,
                            comments: ex === null || ex === void 0 ? void 0 : ex.message,
                        });
                    }
                }
                return {
                    success,
                    duplicates,
                    failed,
                };
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    async update(studentCode, dto) {
        return await this.studentRepo.manager.transaction(async (entityManager) => {
            var _a;
            let student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentCode,
                    active: true,
                },
                relations: {
                    studentCourse: {
                        course: true,
                    },
                    studentStrand: {
                        strand: true,
                    },
                    department: true,
                    registeredByUser: true,
                    updatedByUser: true,
                    school: true,
                    schoolYearLevel: true,
                    studentSection: {
                        section: true,
                    },
                },
            });
            if (!student) {
                throw Error(students_constant_1.STUDENTS_ERROR_NOT_FOUND);
            }
            student.firstName = dto.firstName;
            student.middleInitial = dto.middleInitial;
            student.lastName = dto.lastName;
            student.fullName = `${dto.firstName} ${dto.lastName}`;
            student.email = dto.email;
            student.mobileNumber = dto.mobileNumber;
            student.cardNumber = dto.cardNumber;
            student.address = dto.address;
            student.orgStudentId = dto.orgStudentId;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            student.updatedDate = timestamp;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            student.updatedByUser = updatedByUser;
            const department = await entityManager.findOne(Departments_1.Departments, {
                where: {
                    departmentId: dto.departmentId,
                    active: true,
                },
            });
            if (!department) {
                throw Error(departments_constant_1.DEPARTMENTS_ERROR_NOT_FOUND);
            }
            student.department = department;
            const schoolYearLevel = await entityManager.findOne(SchoolYearLevels_1.SchoolYearLevels, {
                where: {
                    schoolYearLevelId: dto.schoolYearLevelId,
                    school: {
                        schoolId: student.school.schoolId,
                    },
                    active: true,
                },
            });
            if (!schoolYearLevel) {
                throw Error(school_year_levels_constant_1.SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
            }
            student.schoolYearLevel = schoolYearLevel;
            student = await entityManager.save(Students_1.Students, student);
            let studentSection = await entityManager.findOne(StudentSection_1.StudentSection, {
                where: {
                    student: {
                        studentId: student.studentId,
                    },
                },
            });
            if (studentSection) {
                await entityManager.delete(StudentSection_1.StudentSection, studentSection);
            }
            else {
                studentSection = new StudentSection_1.StudentSection();
            }
            const section = await entityManager.findOne(Sections_1.Sections, {
                where: {
                    sectionId: dto.sectionId,
                    active: true,
                },
            });
            if (!section) {
                throw Error(sections_constant_1.SECTIONS_ERROR_NOT_FOUND);
            }
            studentSection.section = section;
            await entityManager.save(StudentSection_1.StudentSection, studentSection);
            let [studentCourse, studentStrand] = await Promise.all([
                entityManager.findOne(StudentCourse_1.StudentCourse, {
                    where: {
                        student: {
                            studentId: student.studentId,
                        },
                    },
                }),
                entityManager.findOne(StudentStrand_1.StudentStrand, {
                    where: {
                        student: {
                            studentId: student.studentId,
                        },
                    },
                }),
            ]);
            if (studentCourse) {
                await entityManager.delete(StudentCourse_1.StudentCourse, studentCourse);
            }
            if (studentStrand) {
                await entityManager.delete(StudentStrand_1.StudentStrand, studentStrand);
            }
            if (schoolYearLevel.educationalStage === educational_stage_constant_1.EDUCATIONAL_STAGE.COLLEGE) {
                studentCourse = new StudentCourse_1.StudentCourse();
                studentCourse.student = student;
                const course = await entityManager.findOne(Courses_1.Courses, {
                    where: {
                        courseId: dto.courseId,
                        active: true,
                    },
                });
                if (!course) {
                    throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
                }
                studentCourse.course = course;
                await entityManager.save(StudentCourse_1.StudentCourse, studentCourse);
            }
            else if (schoolYearLevel.educationalStage === educational_stage_constant_1.EDUCATIONAL_STAGE.SENIOR) {
                studentStrand = new StudentStrand_1.StudentStrand();
                studentStrand.student = student;
                const strand = await entityManager.findOne(Strands_1.Strands, {
                    where: {
                        strandId: dto.strandId,
                        active: true,
                    },
                });
                if (!strand) {
                    throw Error(courses_constant_1.COURSES_ERROR_NOT_FOUND);
                }
                studentStrand.strand = strand;
                await entityManager.save(StudentStrand_1.StudentStrand, studentStrand);
            }
            student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentCode,
                    active: true,
                },
                relations: {
                    parentStudents: {
                        parent: true,
                    },
                    studentCourse: {
                        course: true,
                    },
                    studentStrand: {
                        strand: true,
                    },
                    department: true,
                    registeredByUser: true,
                    updatedByUser: true,
                    school: true,
                    schoolYearLevel: true,
                    studentSection: {
                        section: true,
                    },
                },
            });
            delete student.registeredByUser.password;
            if ((_a = student === null || student === void 0 ? void 0 : student.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete student.updatedByUser.password;
            }
            return student;
        });
    }
    async delete(studentCode) {
        return await this.studentRepo.manager.transaction(async (entityManager) => {
            var _a;
            let student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentCode,
                    active: true,
                },
                relations: {},
            });
            if (!student) {
                throw Error(students_constant_1.STUDENTS_ERROR_NOT_FOUND);
            }
            student.active = false;
            await entityManager.save(Students_1.Students, student);
            student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentCode,
                },
                relations: {
                    parentStudents: {
                        parent: true,
                    },
                    studentCourse: {
                        course: true,
                    },
                    studentStrand: {
                        strand: true,
                    },
                    department: true,
                    registeredByUser: true,
                    updatedByUser: true,
                    school: true,
                    schoolYearLevel: true,
                    studentSection: {
                        section: true,
                    },
                },
            });
            delete student.registeredByUser.password;
            if ((_a = student === null || student === void 0 ? void 0 : student.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete student.updatedByUser.password;
            }
            return student;
        });
    }
    async approveAccessRequest(studentCode) {
        return await this.studentRepo.manager.transaction(async (entityManager) => {
            var _a;
            let student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentCode,
                    active: true,
                },
                relations: {},
            });
            if (!student) {
                throw Error(students_constant_1.STUDENTS_ERROR_NOT_FOUND);
            }
            student.accessGranted = true;
            await entityManager.save(Students_1.Students, student);
            student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentCode,
                },
                relations: {
                    parentStudents: {
                        parent: true,
                    },
                    studentCourse: {
                        course: true,
                    },
                    studentStrand: {
                        strand: true,
                    },
                    department: true,
                    registeredByUser: true,
                    updatedByUser: true,
                    school: true,
                    schoolYearLevel: true,
                    studentSection: {
                        section: true,
                    },
                },
            });
            delete student.registeredByUser.password;
            if ((_a = student === null || student === void 0 ? void 0 : student.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete student.updatedByUser.password;
            }
            return student;
        });
    }
};
StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Students_1.Students)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentsService);
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map