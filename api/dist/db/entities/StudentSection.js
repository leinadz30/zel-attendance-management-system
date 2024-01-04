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
exports.StudentSection = void 0;
const typeorm_1 = require("typeorm");
const Sections_1 = require("./Sections");
const Students_1 = require("./Students");
let StudentSection = class StudentSection {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "StudentId" }),
    __metadata("design:type", String)
], StudentSection.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "SectionId" }),
    __metadata("design:type", String)
], StudentSection.prototype, "sectionId", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "DateAdded",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", String)
], StudentSection.prototype, "dateAdded", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sections_1.Sections, (sections) => sections.studentSections),
    (0, typeorm_1.JoinColumn)([{ name: "SectionId", referencedColumnName: "sectionId" }]),
    __metadata("design:type", Sections_1.Sections)
], StudentSection.prototype, "section", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Students_1.Students, (students) => students.studentSection),
    (0, typeorm_1.JoinColumn)([{ name: "StudentId", referencedColumnName: "studentId" }]),
    __metadata("design:type", Students_1.Students)
], StudentSection.prototype, "student", void 0);
StudentSection = __decorate([
    (0, typeorm_1.Index)("StudentSection_pkey", ["sectionId", "studentId"], { unique: true }),
    (0, typeorm_1.Index)("u_StudentSection", ["studentId"], { unique: true }),
    (0, typeorm_1.Entity)("StudentSection", { schema: "dbo" })
], StudentSection);
exports.StudentSection = StudentSection;
//# sourceMappingURL=StudentSection.js.map