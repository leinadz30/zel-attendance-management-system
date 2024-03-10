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
exports.Courses = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const StudentCourse_1 = require("./StudentCourse");
let Courses = class Courses {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "CourseId" }),
    __metadata("design:type", String)
], Courses.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CourseCode", nullable: true }),
    __metadata("design:type", String)
], Courses.prototype, "courseCode", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "SchoolId" }),
    __metadata("design:type", String)
], Courses.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Courses.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Courses.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Courses.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Courses.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.courses),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Courses.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.courses),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Courses.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.courses2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Courses.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentCourse_1.StudentCourse, (studentCourse) => studentCourse.course),
    __metadata("design:type", Array)
], Courses.prototype, "studentCourses", void 0);
Courses = __decorate([
    (0, typeorm_1.Index)("u_course", ["active", "name", "schoolId"], { unique: true }),
    (0, typeorm_1.Index)("Courses_pkey", ["courseId"], { unique: true }),
    (0, typeorm_1.Entity)("Courses", { schema: "dbo" })
], Courses);
exports.Courses = Courses;
//# sourceMappingURL=Courses.js.map