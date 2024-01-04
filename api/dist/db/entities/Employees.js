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
exports.Employees = void 0;
const typeorm_1 = require("typeorm");
const EmployeeUser_1 = require("./EmployeeUser");
const Users_1 = require("./Users");
const Departments_1 = require("./Departments");
const EmployeeTitles_1 = require("./EmployeeTitles");
const Schools_1 = require("./Schools");
const Sections_1 = require("./Sections");
let Employees = class Employees {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "EmployeeId" }),
    __metadata("design:type", String)
], Employees.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "EmployeeCode", nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "employeeCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FirstName" }),
    __metadata("design:type", String)
], Employees.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MiddleInitial", nullable: true }),
    __metadata("design:type", String)
], Employees.prototype, "middleInitial", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "LastName" }),
    __metadata("design:type", String)
], Employees.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Employees.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Employees.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Employees.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "AccessGranted", default: () => "false" }),
    __metadata("design:type", Boolean)
], Employees.prototype, "accessGranted", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber" }),
    __metadata("design:type", String)
], Employees.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CardNumber" }),
    __metadata("design:type", String)
], Employees.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FullName", default: () => "''" }),
    __metadata("design:type", String)
], Employees.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => EmployeeUser_1.EmployeeUser, (employeeUser) => employeeUser.employee),
    __metadata("design:type", EmployeeUser_1.EmployeeUser)
], Employees.prototype, "employeeUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employees),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Employees.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Departments_1.Departments, (departments) => departments.employees),
    (0, typeorm_1.JoinColumn)([{ name: "DepartmentId", referencedColumnName: "departmentId" }]),
    __metadata("design:type", Departments_1.Departments)
], Employees.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeTitles_1.EmployeeTitles, (employeeTitles) => employeeTitles.employees),
    (0, typeorm_1.JoinColumn)([
        { name: "EmployeePositionId", referencedColumnName: "employeeTitleId" },
    ]),
    __metadata("design:type", EmployeeTitles_1.EmployeeTitles)
], Employees.prototype, "employeePosition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.employees),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Employees.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employees2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Employees.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sections_1.Sections, (sections) => sections.adviserEmployee),
    __metadata("design:type", Array)
], Employees.prototype, "sections", void 0);
Employees = __decorate([
    (0, typeorm_1.Index)("u_employees_number", ["active", "mobileNumber"], { unique: true }),
    (0, typeorm_1.Index)("u_employees_card", ["active", "cardNumber"], { unique: true }),
    (0, typeorm_1.Index)("Employees_pkey", ["employeeId"], { unique: true }),
    (0, typeorm_1.Entity)("Employees", { schema: "dbo" })
], Employees);
exports.Employees = Employees;
//# sourceMappingURL=Employees.js.map