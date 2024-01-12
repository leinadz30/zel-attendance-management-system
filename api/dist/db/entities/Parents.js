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
exports.Parents = void 0;
const typeorm_1 = require("typeorm");
const LinkStudentRequest_1 = require("./LinkStudentRequest");
const ParentStudent_1 = require("./ParentStudent");
const Users_1 = require("./Users");
let Parents = class Parents {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "ParentId" }),
    __metadata("design:type", String)
], Parents.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "ParentCode", nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "parentCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "FullName", default: () => "''" }),
    __metadata("design:type", String)
], Parents.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber" }),
    __metadata("design:type", String)
], Parents.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Email", nullable: true }),
    __metadata("design:type", String)
], Parents.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "RegistrationDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Parents.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Parents.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Parents.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => LinkStudentRequest_1.LinkStudentRequest, (linkStudentRequest) => linkStudentRequest.requestedByParent),
    __metadata("design:type", Array)
], Parents.prototype, "linkStudentRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ParentStudent_1.ParentStudent, (parentStudent) => parentStudent.parent),
    __metadata("design:type", Array)
], Parents.prototype, "parentStudents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.parents),
    (0, typeorm_1.JoinColumn)([{ name: "RegisteredByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Parents.prototype, "registeredByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.parents2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Parents.prototype, "updatedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.parents3),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Parents.prototype, "user", void 0);
Parents = __decorate([
    (0, typeorm_1.Index)("u_parents_email", ["active", "email"], { unique: true }),
    (0, typeorm_1.Index)("u_parents_number", ["active", "mobileNumber"], { unique: true }),
    (0, typeorm_1.Index)("Parents_pkey", ["parentId"], { unique: true }),
    (0, typeorm_1.Entity)("Parents", { schema: "dbo" })
], Parents);
exports.Parents = Parents;
//# sourceMappingURL=Parents.js.map