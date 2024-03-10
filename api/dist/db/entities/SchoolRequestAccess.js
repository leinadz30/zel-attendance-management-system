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
exports.SchoolRequestAccess = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
let SchoolRequestAccess = class SchoolRequestAccess {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "SchoolRequestAccessId" }),
    __metadata("design:type", String)
], SchoolRequestAccess.prototype, "schoolRequestAccessId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status" }),
    __metadata("design:type", String)
], SchoolRequestAccess.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateRequested",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], SchoolRequestAccess.prototype, "dateRequested", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], SchoolRequestAccess.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.schoolRequestAccesses),
    (0, typeorm_1.JoinColumn)([{ name: "RequestedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], SchoolRequestAccess.prototype, "requestedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.schoolRequestAccesses),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], SchoolRequestAccess.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.schoolRequestAccesses2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], SchoolRequestAccess.prototype, "updatedByUser", void 0);
SchoolRequestAccess = __decorate([
    (0, typeorm_1.Index)("SchoolRequestAccess_pkey", ["schoolRequestAccessId"], { unique: true }),
    (0, typeorm_1.Entity)("SchoolRequestAccess", { schema: "dbo" })
], SchoolRequestAccess);
exports.SchoolRequestAccess = SchoolRequestAccess;
//# sourceMappingURL=SchoolRequestAccess.js.map