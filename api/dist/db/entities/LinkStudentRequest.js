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
exports.LinkStudentRequest = void 0;
const typeorm_1 = require("typeorm");
const Parents_1 = require("./Parents");
const Schools_1 = require("./Schools");
const Students_1 = require("./Students");
const Users_1 = require("./Users");
let LinkStudentRequest = class LinkStudentRequest {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "LinkStudentRequestId" }),
    __metadata("design:type", String)
], LinkStudentRequest.prototype, "linkStudentRequestId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Status", default: () => "'PENDING'" }),
    __metadata("design:type", String)
], LinkStudentRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "DateRequested",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], LinkStudentRequest.prototype, "dateRequested", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], LinkStudentRequest.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Notes", nullable: true }),
    __metadata("design:type", String)
], LinkStudentRequest.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "LinkStudentRequestCode",
        nullable: true,
    }),
    __metadata("design:type", String)
], LinkStudentRequest.prototype, "linkStudentRequestCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Parents_1.Parents, (parents) => parents.linkStudentRequests),
    (0, typeorm_1.JoinColumn)([
        { name: "RequestedByParentId", referencedColumnName: "parentId" },
    ]),
    __metadata("design:type", Parents_1.Parents)
], LinkStudentRequest.prototype, "requestedByParent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.linkStudentRequests),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], LinkStudentRequest.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Students_1.Students, (students) => students.linkStudentRequests),
    (0, typeorm_1.JoinColumn)([{ name: "StudentId", referencedColumnName: "studentId" }]),
    __metadata("design:type", Students_1.Students)
], LinkStudentRequest.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.linkStudentRequests),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], LinkStudentRequest.prototype, "updatedByUser", void 0);
LinkStudentRequest = __decorate([
    (0, typeorm_1.Index)("LinkStudentRequest_pkey", ["linkStudentRequestId"], { unique: true }),
    (0, typeorm_1.Entity)("LinkStudentRequest", { schema: "dbo" })
], LinkStudentRequest);
exports.LinkStudentRequest = LinkStudentRequest;
//# sourceMappingURL=LinkStudentRequest.js.map