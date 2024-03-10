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
exports.Schools = void 0;
const typeorm_1 = require("typeorm");
const Announcements_1 = require("./Announcements");
const Courses_1 = require("./Courses");
const Departments_1 = require("./Departments");
const EmployeeTitles_1 = require("./EmployeeTitles");
const EmployeeUserAccess_1 = require("./EmployeeUserAccess");
const Employees_1 = require("./Employees");
const LinkStudentRequest_1 = require("./LinkStudentRequest");
const Machines_1 = require("./Machines");
const SchoolRequestAccess_1 = require("./SchoolRequestAccess");
const SchoolYearLevels_1 = require("./SchoolYearLevels");
const Users_1 = require("./Users");
const Sections_1 = require("./Sections");
const Strands_1 = require("./Strands");
const Students_1 = require("./Students");
let Schools = class Schools {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "SchoolId" }),
    __metadata("design:type", String)
], Schools.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SchoolCode", nullable: true }),
    __metadata("design:type", String)
], Schools.prototype, "schoolCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SchoolName" }),
    __metadata("design:type", String)
], Schools.prototype, "schoolName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "StudentsAllowableTimeLate",
        nullable: true,
    }),
    __metadata("design:type", String)
], Schools.prototype, "studentsAllowableTimeLate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "StudentsTimeLate", nullable: true }),
    __metadata("design:type", String)
], Schools.prototype, "studentsTimeLate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "RestrictGuardianTime", nullable: true }),
    __metadata("design:type", Boolean)
], Schools.prototype, "restrictGuardianTime", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "EmployeesTimeBeforeSwipeIsAllowed",
        nullable: true,
    }),
    __metadata("design:type", String)
], Schools.prototype, "employeesTimeBeforeSwipeIsAllowed", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "EmployeesAllowableTimeLate",
        nullable: true,
    }),
    __metadata("design:type", String)
], Schools.prototype, "employeesAllowableTimeLate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "EmployeesTimeLate", nullable: true }),
    __metadata("design:type", String)
], Schools.prototype, "employeesTimeLate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "TimeBeforeSwipeIsAllowed",
        nullable: true,
    }),
    __metadata("design:type", String)
], Schools.prototype, "timeBeforeSwipeIsAllowed", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "SMSNotificationForStaffEntry",
        nullable: true,
    }),
    __metadata("design:type", String)
], Schools.prototype, "smsNotificationForStaffEntry", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "SMSNotificationForStudentBreakTime",
        nullable: true,
    }),
    __metadata("design:type", String)
], Schools.prototype, "smsNotificationForStudentBreakTime", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SchoolContactNumber", nullable: true }),
    __metadata("design:type", String)
], Schools.prototype, "schoolContactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SchoolAddress", nullable: true }),
    __metadata("design:type", String)
], Schools.prototype, "schoolAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SchoolEmail", nullable: true }),
    __metadata("design:type", String)
], Schools.prototype, "schoolEmail", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateRegistered",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Schools.prototype, "dateRegistered", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "DateUpdated", nullable: true }),
    __metadata("design:type", Date)
], Schools.prototype, "dateUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Schools.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "OrgSchoolCode", default: () => "''" }),
    __metadata("design:type", String)
], Schools.prototype, "orgSchoolCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Announcements_1.Announcements, (announcements) => announcements.school),
    __metadata("design:type", Array)
], Schools.prototype, "announcements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Courses_1.Courses, (courses) => courses.school),
    __metadata("design:type", Array)
], Schools.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Departments_1.Departments, (departments) => departments.school),
    __metadata("design:type", Array)
], Schools.prototype, "departments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeTitles_1.EmployeeTitles, (employeeTitles) => employeeTitles.school),
    __metadata("design:type", Array)
], Schools.prototype, "employeeTitles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeUserAccess_1.EmployeeUserAccess, (employeeUserAccess) => employeeUserAccess.school),
    __metadata("design:type", Array)
], Schools.prototype, "employeeUserAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Employees_1.Employees, (employees) => employees.school),
    __metadata("design:type", Array)
], Schools.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LinkStudentRequest_1.LinkStudentRequest, (linkStudentRequest) => linkStudentRequest.school),
    __metadata("design:type", Array)
], Schools.prototype, "linkStudentRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Machines_1.Machines, (machines) => machines.school),
    __metadata("design:type", Array)
], Schools.prototype, "machines", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SchoolRequestAccess_1.SchoolRequestAccess, (schoolRequestAccess) => schoolRequestAccess.school),
    __metadata("design:type", Array)
], Schools.prototype, "schoolRequestAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SchoolYearLevels_1.SchoolYearLevels, (schoolYearLevels) => schoolYearLevels.school),
    __metadata("design:type", Array)
], Schools.prototype, "schoolYearLevels", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.schools),
    (0, typeorm_1.JoinColumn)([{ name: "RegisteredByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Schools.prototype, "registeredByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.schools2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Schools.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sections_1.Sections, (sections) => sections.school),
    __metadata("design:type", Array)
], Schools.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Strands_1.Strands, (strands) => strands.school),
    __metadata("design:type", Array)
], Schools.prototype, "strands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Students_1.Students, (students) => students.school),
    __metadata("design:type", Array)
], Schools.prototype, "students", void 0);
Schools = __decorate([
    (0, typeorm_1.Index)("Schools_pkey", ["schoolId"], { unique: true }),
    (0, typeorm_1.Entity)("Schools", { schema: "dbo" })
], Schools);
exports.Schools = Schools;
//# sourceMappingURL=Schools.js.map