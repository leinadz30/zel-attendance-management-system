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
exports.EmployeeUserAccess = void 0;
const typeorm_1 = require("typeorm");
const EmployeeUser_1 = require("./EmployeeUser");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
let EmployeeUserAccess = class EmployeeUserAccess {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "EmployeeUserAccessId" }),
    __metadata("design:type", String)
], EmployeeUserAccess.prototype, "employeeUserAccessId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "EmployeeUserAccessCode",
        nullable: true,
    }),
    __metadata("design:type", String)
], EmployeeUserAccess.prototype, "employeeUserAccessCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], EmployeeUserAccess.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: "AccessPages", default: [] }),
    __metadata("design:type", Object)
], EmployeeUserAccess.prototype, "accessPages", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], EmployeeUserAccess.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], EmployeeUserAccess.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], EmployeeUserAccess.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeUser_1.EmployeeUser, (employeeUser) => employeeUser.employeeUserAccess),
    __metadata("design:type", Array)
], EmployeeUserAccess.prototype, "employeeUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employeeUserAccesses),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], EmployeeUserAccess.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.employeeUserAccesses),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], EmployeeUserAccess.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employeeUserAccesses2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], EmployeeUserAccess.prototype, "updatedByUser", void 0);
EmployeeUserAccess = __decorate([
    (0, typeorm_1.Index)("EmployeeUserAccess_pkey", ["employeeUserAccessId"], { unique: true }),
    (0, typeorm_1.Entity)("EmployeeUserAccess", { schema: "dbo" })
], EmployeeUserAccess);
exports.EmployeeUserAccess = EmployeeUserAccess;
//# sourceMappingURL=EmployeeUserAccess.js.map