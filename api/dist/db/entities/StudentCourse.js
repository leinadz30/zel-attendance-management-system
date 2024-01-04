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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentCourse = void 0;
const typeorm_1 = require("typeorm");
const Courses_1 = require("./Courses");
const Students_1 = require("./Students");
let StudentCourse = class StudentCourse {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "StudentId" }),
    __metadata("design:type", String)
], StudentCourse.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "CourseId" }),
    __metadata("design:type", String)
], StudentCourse.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "EnrolledDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", String)
], StudentCourse.prototype, "enrolledDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Courses_1.Courses, (courses) => courses.studentCourses),
    (0, typeorm_1.JoinColumn)([{ name: "CourseId", referencedColumnName: "courseId" }]),
    __metadata("design:type", Courses_1.Courses)
], StudentCourse.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Students_1.Students, (students) => students.studentCourse),
    (0, typeorm_1.JoinColumn)([{ name: "StudentId", referencedColumnName: "studentId" }]),
    __metadata("design:type", Students_1.Students)
], StudentCourse.prototype, "student", void 0);
StudentCourse = __decorate([
    (0, typeorm_1.Index)("StudentCourse_pkey", ["courseId", "studentId"], { unique: true }),
    (0, typeorm_1.Index)("u_StudentCourse", ["studentId"], { unique: true }),
    (0, typeorm_1.Entity)("StudentCourse", { schema: "dbo" })
], StudentCourse);
exports.StudentCourse = StudentCourse;
//# sourceMappingURL=StudentCourse.js.map