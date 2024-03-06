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
exports.EmployeeUserRoles = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const EmployeeUser_1 = require("./EmployeeUser");
let EmployeeUserRoles = class EmployeeUserRoles {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "EmployeeUserRoleId" }),
    __metadata("design:type", String)
], EmployeeUserRoles.prototype, "employeeRoleId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "EmployeeUserRoleCode", nullable: true }),
    __metadata("design:type", String)
], EmployeeUserRoles.prototype, "employeeRoleCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], EmployeeUserRoles.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { name: "EmployeeUserRoleAccess", default: [] }),
    __metadata("design:type", Object)
], EmployeeUserRoles.prototype, "employeeRoleAccess", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], EmployeeUserRoles.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], EmployeeUserRoles.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], EmployeeUserRoles.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employeeRoles),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], EmployeeUserRoles.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.employeeRoles),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], EmployeeUserRoles.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employeeRoles2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], EmployeeUserRoles.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EmployeeUser_1.EmployeeUser, (employeeUser) => employeeUser.employeeUserRole),
    __metadata("design:type", Array)
], EmployeeUserRoles.prototype, "employeeUsers", void 0);
EmployeeUserRoles = __decorate([
    (0, typeorm_1.Index)("EmployeeUserRoles_pkey", ["employeeRoleId"], { unique: true }),
    (0, typeorm_1.Entity)("EmployeeUserRoles", { schema: "dbo" })
], EmployeeUserRoles);
exports.EmployeeUserRoles = EmployeeUserRoles;
//# sourceMappingURL=EmployeeUserRoles.js.map