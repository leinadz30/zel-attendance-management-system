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
exports.Departments = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const Employees_1 = require("./Employees");
const Sections_1 = require("./Sections");
const Students_1 = require("./Students");
let Departments = class Departments {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "DepartmentId" }),
    __metadata("design:type", String)
], Departments.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "DepartmentCode", nullable: true }),
    __metadata("design:type", String)
], Departments.prototype, "departmentCode", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "SchoolId" }),
    __metadata("design:type", String)
], Departments.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "DepartmentName" }),
    __metadata("design:type", String)
], Departments.prototype, "departmentName", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Departments.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Departments.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Departments.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.departments),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Departments.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.departments),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Departments.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.departments2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Departments.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Employees_1.Employees, (employees) => employees.department),
    __metadata("design:type", Array)
], Departments.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sections_1.Sections, (sections) => sections.department),
    __metadata("design:type", Array)
], Departments.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Students_1.Students, (students) => students.department),
    __metadata("design:type", Array)
], Departments.prototype, "students", void 0);
Departments = __decorate([
    (0, typeorm_1.Index)("u_department", ["active", "departmentName", "schoolId"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("Departments_pkey", ["departmentId"], { unique: true }),
    (0, typeorm_1.Entity)("Departments", { schema: "dbo" })
], Departments);
exports.Departments = Departments;
//# sourceMappingURL=Departments.js.map