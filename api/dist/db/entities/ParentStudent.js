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
exports.ParentStudent = void 0;
const typeorm_1 = require("typeorm");
const Parents_1 = require("./Parents");
const Students_1 = require("./Students");
let ParentStudent = class ParentStudent {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "ParentId" }),
    __metadata("design:type", String)
], ParentStudent.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "StudentId" }),
    __metadata("design:type", String)
], ParentStudent.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateAdded",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], ParentStudent.prototype, "dateAdded", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], ParentStudent.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Parents_1.Parents, (parents) => parents.parentStudents),
    (0, typeorm_1.JoinColumn)([{ name: "ParentId", referencedColumnName: "parentId" }]),
    __metadata("design:type", Parents_1.Parents)
], ParentStudent.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Students_1.Students, (students) => students.parentStudents),
    (0, typeorm_1.JoinColumn)([{ name: "StudentId", referencedColumnName: "studentId" }]),
    __metadata("design:type", Students_1.Students)
], ParentStudent.prototype, "student", void 0);
ParentStudent = __decorate([
    (0, typeorm_1.Index)("ParentStudent_pkey", ["parentId", "studentId"], { unique: true }),
    (0, typeorm_1.Entity)("ParentStudent", { schema: "dbo" })
], ParentStudent);
exports.ParentStudent = ParentStudent;
//# sourceMappingURL=ParentStudent.js.map