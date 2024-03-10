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
exports.TapLogs = void 0;
const typeorm_1 = require("typeorm");
const Machines_1 = require("./Machines");
let TapLogs = class TapLogs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "TapLogId" }),
    __metadata("design:type", String)
], TapLogs.prototype, "tapLogId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status" }),
    __metadata("design:type", String)
], TapLogs.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "Date",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", String)
], TapLogs.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Time" }),
    __metadata("design:type", String)
], TapLogs.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "CardNumber", default: () => "''" }),
    __metadata("design:type", String)
], TapLogs.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Type", default: () => "''" }),
    __metadata("design:type", String)
], TapLogs.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Machines_1.Machines, (machines) => machines.tapLogs),
    (0, typeorm_1.JoinColumn)([{ name: "MachineId", referencedColumnName: "machineId" }]),
    __metadata("design:type", Machines_1.Machines)
], TapLogs.prototype, "machine", void 0);
TapLogs = __decorate([
    (0, typeorm_1.Index)("TapLogs_pkey", ["tapLogId"], { unique: true }),
    (0, typeorm_1.Entity)("TapLogs", { schema: "dbo" })
], TapLogs);
exports.TapLogs = TapLogs;
//# sourceMappingURL=TapLogs.js.map