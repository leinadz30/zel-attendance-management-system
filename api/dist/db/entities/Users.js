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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Announcements_1 = require("./Announcements");
const Courses_1 = require("./Courses");
const Departments_1 = require("./Departments");
const EmployeeTitles_1 = require("./EmployeeTitles");
const EmployeeUser_1 = require("./EmployeeUser");
const EmployeeUserAccess_1 = require("./EmployeeUserAccess");
const Employees_1 = require("./Employees");
const LinkStudentRequest_1 = require("./LinkStudentRequest");
const Machines_1 = require("./Machines");
const Notifications_1 = require("./Notifications");
const Operators_1 = require("./Operators");
const Parents_1 = require("./Parents");
const SchoolRequestAccess_1 = require("./SchoolRequestAccess");
const SchoolYearLevels_1 = require("./SchoolYearLevels");
const Schools_1 = require("./Schools");
const Sections_1 = require("./Sections");
const Strands_1 = require("./Strands");
const Students_1 = require("./Students");
const UserFirebaseToken_1 = require("./UserFirebaseToken");
const UserOneSignalSubscription_1 = require("./UserOneSignalSubscription");
const UserProfilePic_1 = require("./UserProfilePic");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserId" }),
    __metadata("design:type", String)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserCode", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "userCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserName" }),
    __metadata("design:type", String)
], Users.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Password" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "UserType" }),
    __metadata("design:type", String)
], Users.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateRegistered",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Users.prototype, "dateRegistered", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "DateUpdated", nullable: true }),
    __metadata("design:type", Date)
], Users.prototype, "dateUpdated", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Users.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Announcements_1.Announcements, (announcements) => announcements.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "announcements", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Announcements_1.Announcements, (announcements) => announcements.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "announcements2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Courses_1.Courses, (courses) => courses.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "courses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Courses_1.Courses, (courses) => courses.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "courses2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Departments_1.Departments, (departments) => departments.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "departments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Departments_1.Departments, (departments) => departments.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "departments2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeTitles_1.EmployeeTitles, (employeeTitles) => employeeTitles.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "employeeTitles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeTitles_1.EmployeeTitles, (employeeTitles) => employeeTitles.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "employeeTitles2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeUser_1.EmployeeUser, (employeeUser) => employeeUser.user),
    __metadata("design:type", Array)
], Users.prototype, "employeeUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeUserAccess_1.EmployeeUserAccess, (employeeUserAccess) => employeeUserAccess.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "employeeUserAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeUserAccess_1.EmployeeUserAccess, (employeeUserAccess) => employeeUserAccess.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "employeeUserAccesses2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Employees_1.Employees, (employees) => employees.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Employees_1.Employees, (employees) => employees.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "employees2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LinkStudentRequest_1.LinkStudentRequest, (linkStudentRequest) => linkStudentRequest.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "linkStudentRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Machines_1.Machines, (machines) => machines.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "machines", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Machines_1.Machines, (machines) => machines.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "machines2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notifications_1.Notifications, (notifications) => notifications.forUser),
    __metadata("design:type", Array)
], Users.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Operators_1.Operators, (operators) => operators.user),
    __metadata("design:type", Array)
], Users.prototype, "operators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Parents_1.Parents, (parents) => parents.registeredByUser),
    __metadata("design:type", Array)
], Users.prototype, "parents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Parents_1.Parents, (parents) => parents.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "parents2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Parents_1.Parents, (parents) => parents.user),
    __metadata("design:type", Array)
], Users.prototype, "parents3", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SchoolRequestAccess_1.SchoolRequestAccess, (schoolRequestAccess) => schoolRequestAccess.requestedByUser),
    __metadata("design:type", Array)
], Users.prototype, "schoolRequestAccesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SchoolRequestAccess_1.SchoolRequestAccess, (schoolRequestAccess) => schoolRequestAccess.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "schoolRequestAccesses2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SchoolYearLevels_1.SchoolYearLevels, (schoolYearLevels) => schoolYearLevels.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "schoolYearLevels", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SchoolYearLevels_1.SchoolYearLevels, (schoolYearLevels) => schoolYearLevels.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "schoolYearLevels2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Schools_1.Schools, (schools) => schools.registeredByUser),
    __metadata("design:type", Array)
], Users.prototype, "schools", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Schools_1.Schools, (schools) => schools.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "schools2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sections_1.Sections, (sections) => sections.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sections_1.Sections, (sections) => sections.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "sections2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Strands_1.Strands, (strands) => strands.createdByUser),
    __metadata("design:type", Array)
], Users.prototype, "strands", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Strands_1.Strands, (strands) => strands.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "strands2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Students_1.Students, (students) => students.registeredByUser),
    __metadata("design:type", Array)
], Users.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Students_1.Students, (students) => students.updatedByUser),
    __metadata("design:type", Array)
], Users.prototype, "students2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserFirebaseToken_1.UserFirebaseToken, (userFirebaseToken) => userFirebaseToken.user),
    __metadata("design:type", Array)
], Users.prototype, "userFirebaseTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserOneSignalSubscription_1.UserOneSignalSubscription, (userOneSignalSubscription) => userOneSignalSubscription.user),
    __metadata("design:type", Array)
], Users.prototype, "userOneSignalSubscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserProfilePic_1.UserProfilePic, (userProfilePic) => userProfilePic.user),
    __metadata("design:type", UserProfilePic_1.UserProfilePic)
], Users.prototype, "userProfilePic", void 0);
Users = __decorate([
    (0, typeorm_1.Index)("u_user", ["active", "userName"], { unique: true }),
    (0, typeorm_1.Index)("Users_pkey", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("Users", { schema: "dbo" })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map