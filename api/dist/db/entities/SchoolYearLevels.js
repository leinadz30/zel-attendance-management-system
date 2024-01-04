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
exports.SchoolYearLevels = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const Sections_1 = require("./Sections");
const Students_1 = require("./Students");
let SchoolYearLevels = class SchoolYearLevels {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "SchoolYearLevelId" }),
    __metadata("design:type", String)
], SchoolYearLevels.prototype, "schoolYearLevelId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "SchoolYearLevelCode", nullable: true }),
    __metadata("design:type", String)
], SchoolYearLevels.prototype, "schoolYearLevelCode", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "SchoolId" }),
    __metadata("design:type", String)
], SchoolYearLevels.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name", nullable: true }),
    __metadata("design:type", String)
], SchoolYearLevels.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], SchoolYearLevels.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], SchoolYearLevels.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], SchoolYearLevels.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "EducationalStage",
        default: () => "''",
    }),
    __metadata("design:type", String)
], SchoolYearLevels.prototype, "educationalStage", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.schoolYearLevels),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], SchoolYearLevels.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.schoolYearLevels),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], SchoolYearLevels.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.schoolYearLevels2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], SchoolYearLevels.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sections_1.Sections, (sections) => sections.schoolYearLevel),
    __metadata("design:type", Array)
], SchoolYearLevels.prototype, "sections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Students_1.Students, (students) => students.schoolYearLevel),
    __metadata("design:type", Array)
], SchoolYearLevels.prototype, "students", void 0);
SchoolYearLevels = __decorate([
    (0, typeorm_1.Index)("u_school_year_level", ["active", "name", "schoolId"], { unique: true }),
    (0, typeorm_1.Index)("SchoolYearLevels_pkey", ["schoolYearLevelId"], { unique: true }),
    (0, typeorm_1.Entity)("SchoolYearLevels", { schema: "dbo" })
], SchoolYearLevels);
exports.SchoolYearLevels = SchoolYearLevels;
//# sourceMappingURL=SchoolYearLevels.js.map