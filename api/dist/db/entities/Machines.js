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
exports.Machines = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
const TapLogs_1 = require("./TapLogs");
let Machines = class Machines {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "MachineId" }),
    __metadata("design:type", String)
], Machines.prototype, "machineId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MachineCode", nullable: true }),
    __metadata("design:type", String)
], Machines.prototype, "machineCode", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "SchoolId" }),
    __metadata("design:type", String)
], Machines.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description" }),
    __metadata("design:type", String)
], Machines.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Path", nullable: true }),
    __metadata("design:type", String)
], Machines.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Domain", nullable: true }),
    __metadata("design:type", String)
], Machines.prototype, "domain", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Machines.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Machines.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Machines.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.machines),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Machines.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.machines),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Machines.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.machines2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Machines.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TapLogs_1.TapLogs, (tapLogs) => tapLogs.machine),
    __metadata("design:type", Array)
], Machines.prototype, "tapLogs", void 0);
Machines = __decorate([
    (0, typeorm_1.Index)("u_machine", ["active", "description", "schoolId"], { unique: true }),
    (0, typeorm_1.Index)("Machines_pkey", ["machineId"], { unique: true }),
    (0, typeorm_1.Entity)("Machines", { schema: "dbo" })
], Machines);
exports.Machines = Machines;
//# sourceMappingURL=Machines.js.map