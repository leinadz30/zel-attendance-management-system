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
exports.EmployeeUser = void 0;
const typeorm_1 = require("typeorm");
const Employees_1 = require("./Employees");
const EmployeeUserAccess_1 = require("./EmployeeUserAccess");
const Users_1 = require("./Users");
let EmployeeUser = class EmployeeUser {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "EmployeeId" }),
    __metadata("design:type", String)
], EmployeeUser.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "UserId" }),
    __metadata("design:type", String)
], EmployeeUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateRegistered",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], EmployeeUser.prototype, "dateRegistered", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], EmployeeUser.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Employees_1.Employees, (employees) => employees.employeeUser),
    (0, typeorm_1.JoinColumn)([{ name: "EmployeeId", referencedColumnName: "employeeId" }]),
    __metadata("design:type", Employees_1.Employees)
], EmployeeUser.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EmployeeUserAccess_1.EmployeeUserAccess, (employeeUserAccess) => employeeUserAccess.employeeUsers),
    (0, typeorm_1.JoinColumn)([
        {
            name: "EmployeeUserAccessId",
            referencedColumnName: "employeeUserAccessId",
        },
    ]),
    __metadata("design:type", EmployeeUserAccess_1.EmployeeUserAccess)
], EmployeeUser.prototype, "employeeUserAccess", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.employeeUsers),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], EmployeeUser.prototype, "user", void 0);
EmployeeUser = __decorate([
    (0, typeorm_1.Index)("EmployeeUser_pkey", ["employeeId", "userId"], { unique: true }),
    (0, typeorm_1.Index)("u_Employee", ["employeeId"], { unique: true }),
    (0, typeorm_1.Entity)("EmployeeUser", { schema: "dbo" })
], EmployeeUser);
exports.EmployeeUser = EmployeeUser;
//# sourceMappingURL=EmployeeUser.js.map