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
exports.Strands = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const StudentStrand_1 = require("./StudentStrand");
let Strands = class Strands {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "StrandId" }),
    __metadata("design:type", String)
], Strands.prototype, "strandId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "StrandCode", nullable: true }),
    __metadata("design:type", String)
], Strands.prototype, "strandCode", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "SchoolId" }),
    __metadata("design:type", String)
], Strands.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Strands.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Strands.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Strands.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Strands.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.strands),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Strands.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.strands),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Strands.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.strands2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Strands.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentStrand_1.StudentStrand, (studentStrand) => studentStrand.strand),
    __metadata("design:type", Array)
], Strands.prototype, "studentStrands", void 0);
Strands = __decorate([
    (0, typeorm_1.Index)("u_strand", ["active", "name", "schoolId"], { unique: true }),
    (0, typeorm_1.Index)("Strands_pkey", ["strandId"], { unique: true }),
    (0, typeorm_1.Entity)("Strands", { schema: "dbo" })
], Strands);
exports.Strands = Strands;
//# sourceMappingURL=Strands.js.map