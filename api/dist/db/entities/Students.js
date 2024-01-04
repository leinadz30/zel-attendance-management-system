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
exports.Students = void 0;
const typeorm_1 = require("typeorm");
const LinkStudentRequest_1 = require("./LinkStudentRequest");
const ParentStudent_1 = require("./ParentStudent");
const StudentCourse_1 = require("./StudentCourse");
const StudentSection_1 = require("./StudentSection");
const StudentStrand_1 = require("./StudentStrand");
const Departments_1 = require("./Departments");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const SchoolYearLevels_1 = require("./SchoolYearLevels");
const TapLogs_1 = require("./TapLogs");
let Students = class Students {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "StudentId" }),
    __metadata("design:type", String)
], Students.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "StudentCode", nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "studentCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FirstName" }),
    __metadata("design:type", String)
], Students.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MiddleInitial", nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "middleInitial", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LastName" }),
    __metadata("design:type", String)
], Students.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CardNumber" }),
    __metadata("design:type", String)
], Students.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber" }),
    __metadata("design:type", String)
], Students.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Address", nullable: true }),
    __metadata("design:type", String)
], Students.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", {
        name: "AccessGranted",
        nullable: true,
        default: () => "false",
    }),
    __metadata("design:type", Boolean)
], Students.prototype, "accessGranted", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "RegistrationDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Students.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Students.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Students.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FullName", default: () => "''" }),
    __metadata("design:type", String)
], Students.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "OrgStudentId", default: () => "''" }),
    __metadata("design:type", String)
], Students.prototype, "orgStudentId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LinkStudentRequest_1.LinkStudentRequest, (linkStudentRequest) => linkStudentRequest.student),
    __metadata("design:type", Array)
], Students.prototype, "linkStudentRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ParentStudent_1.ParentStudent, (parentStudent) => parentStudent.student),
    __metadata("design:type", Array)
], Students.prototype, "parentStudents", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => StudentCourse_1.StudentCourse, (studentCourse) => studentCourse.student),
    __metadata("design:type", StudentCourse_1.StudentCourse)
], Students.prototype, "studentCourse", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => StudentSection_1.StudentSection, (studentSection) => studentSection.student),
    __metadata("design:type", StudentSection_1.StudentSection)
], Students.prototype, "studentSection", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => StudentStrand_1.StudentStrand, (studentStrand) => studentStrand.student),
    __metadata("design:type", StudentStrand_1.StudentStrand)
], Students.prototype, "studentStrand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Departments_1.Departments, (departments) => departments.students),
    (0, typeorm_1.JoinColumn)([{ name: "DepartmentId", referencedColumnName: "departmentId" }]),
    __metadata("design:type", Departments_1.Departments)
], Students.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.students),
    (0, typeorm_1.JoinColumn)([{ name: "RegisteredByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Students.prototype, "registeredByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.students),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Students.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SchoolYearLevels_1.SchoolYearLevels, (schoolYearLevels) => schoolYearLevels.students),
    (0, typeorm_1.JoinColumn)([
        { name: "SchoolYearLevelId", referencedColumnName: "schoolYearLevelId" },
    ]),
    __metadata("design:type", SchoolYearLevels_1.SchoolYearLevels)
], Students.prototype, "schoolYearLevel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.students2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Students.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TapLogs_1.TapLogs, (tapLogs) => tapLogs.student),
    __metadata("design:type", Array)
], Students.prototype, "tapLogs", void 0);
Students = __decorate([
    (0, typeorm_1.Index)("u_students_email", ["active", "email"], { unique: true }),
    (0, typeorm_1.Index)("u_students_number", ["active", "mobileNumber"], { unique: true }),
    (0, typeorm_1.Index)("u_students_card", ["active", "cardNumber"], { unique: true }),
    (0, typeorm_1.Index)("Students_pkey", ["studentId"], { unique: true }),
    (0, typeorm_1.Entity)("Students", { schema: "dbo" })
], Students);
exports.Students = Students;
//# sourceMappingURL=Students.js.map