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
exports.StudentStrand = void 0;
const typeorm_1 = require("typeorm");
const Strands_1 = require("./Strands");
const Students_1 = require("./Students");
let StudentStrand = class StudentStrand {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "StudentId" }),
    __metadata("design:type", String)
], StudentStrand.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "StrandId" }),
    __metadata("design:type", String)
], StudentStrand.prototype, "strandId", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "EnrolledDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", String)
], StudentStrand.prototype, "enrolledDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Strands_1.Strands, (strands) => strands.studentStrands),
    (0, typeorm_1.JoinColumn)([{ name: "StrandId", referencedColumnName: "strandId" }]),
    __metadata("design:type", Strands_1.Strands)
], StudentStrand.prototype, "strand", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Students_1.Students, (students) => students.studentStrand),
    (0, typeorm_1.JoinColumn)([{ name: "StudentId", referencedColumnName: "studentId" }]),
    __metadata("design:type", Students_1.Students)
], StudentStrand.prototype, "student", void 0);
StudentStrand = __decorate([
    (0, typeorm_1.Index)("StudentStrand_pkey", ["strandId", "studentId"], { unique: true }),
    (0, typeorm_1.Index)("u_StudentStrand", ["studentId"], { unique: true }),
    (0, typeorm_1.Entity)("StudentStrand", { schema: "dbo" })
], StudentStrand);
exports.StudentStrand = StudentStrand;
//# sourceMappingURL=StudentStrand.js.map