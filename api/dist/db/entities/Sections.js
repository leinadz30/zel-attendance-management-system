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
exports.Sections = void 0;
const typeorm_1 = require("typeorm");
const Employees_1 = require("./Employees");
const Users_1 = require("./Users");
const Departments_1 = require("./Departments");
const Schools_1 = require("./Schools");
const SchoolYearLevels_1 = require("./SchoolYearLevels");
const StudentSection_1 = require("./StudentSection");
let Sections = class Sections {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "SectionId" }),
    __metadata("design:type", String)
], Sections.prototype, "sectionId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SectionCode", nullable: true }),
    __metadata("design:type", String)
], Sections.prototype, "sectionCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SectionName" }),
    __metadata("design:type", String)
], Sections.prototype, "sectionName", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Sections.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Sections.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Sections.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Employees_1.Employees, (employees) => employees.sections),
    (0, typeorm_1.JoinColumn)([
        { name: "AdviserEmployeeId", referencedColumnName: "employeeId" },
    ]),
    __metadata("design:type", Employees_1.Employees)
], Sections.prototype, "adviserEmployee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.sections),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Sections.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Departments_1.Departments, (departments) => departments.sections),
    (0, typeorm_1.JoinColumn)([{ name: "DepartmentId", referencedColumnName: "departmentId" }]),
    __metadata("design:type", Departments_1.Departments)
], Sections.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.sections),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Sections.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SchoolYearLevels_1.SchoolYearLevels, (schoolYearLevels) => schoolYearLevels.sections),
    (0, typeorm_1.JoinColumn)([
        { name: "SchoolYearLevelId", referencedColumnName: "schoolYearLevelId" },
    ]),
    __metadata("design:type", SchoolYearLevels_1.SchoolYearLevels)
], Sections.prototype, "schoolYearLevel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.sections2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Sections.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentSection_1.StudentSection, (studentSection) => studentSection.section),
    __metadata("design:type", Array)
], Sections.prototype, "studentSections", void 0);
Sections = __decorate([
    (0, typeorm_1.Index)("Sections_pkey", ["sectionId"], { unique: true }),
    (0, typeorm_1.Entity)("Sections", { schema: "dbo" })
], Sections);
exports.Sections = Sections;
//# sourceMappingURL=Sections.js.map