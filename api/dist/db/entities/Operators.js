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
exports.Operators = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let Operators = class Operators {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "OperatorId" }),
    __metadata("design:type", String)
], Operators.prototype, "operatorId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "OperatorCode", nullable: true }),
    __metadata("design:type", String)
], Operators.prototype, "operatorCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Operators.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Operators.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.operators),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Operators.prototype, "user", void 0);
Operators = __decorate([
    (0, typeorm_1.Index)("Operators_pkey", ["operatorId"], { unique: true }),
    (0, typeorm_1.Entity)("Operators", { schema: "dbo" })
], Operators);
exports.Operators = Operators;
//# sourceMappingURL=Operators.js.map