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
exports.Announcements = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Schools_1 = require("./Schools");
let Announcements = class Announcements {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "AnnouncementId" }),
    __metadata("design:type", String)
], Announcements.prototype, "announcementId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "AnnouncementCode", nullable: true }),
    __metadata("design:type", String)
], Announcements.prototype, "announcementCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Title" }),
    __metadata("design:type", String)
], Announcements.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Description" }),
    __metadata("design:type", String)
], Announcements.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "TargetDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Announcements.prototype, "targetDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "TargetType" }),
    __metadata("design:type", String)
], Announcements.prototype, "targetType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "TargetIds", array: true }),
    __metadata("design:type", Array)
], Announcements.prototype, "targetIds", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Scheduled", default: () => "false" }),
    __metadata("design:type", Boolean)
], Announcements.prototype, "scheduled", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "CreatedDate",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Announcements.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "UpdatedDate", nullable: true }),
    __metadata("design:type", Date)
], Announcements.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Draft", default: () => "false" }),
    __metadata("design:type", Boolean)
], Announcements.prototype, "draft", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Sent", default: () => "false" }),
    __metadata("design:type", Boolean)
], Announcements.prototype, "sent", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { name: "Active", default: () => "true" }),
    __metadata("design:type", Boolean)
], Announcements.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.announcements),
    (0, typeorm_1.JoinColumn)([{ name: "CreatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Announcements.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Schools_1.Schools, (schools) => schools.announcements),
    (0, typeorm_1.JoinColumn)([{ name: "SchoolId", referencedColumnName: "schoolId" }]),
    __metadata("design:type", Schools_1.Schools)
], Announcements.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.announcements2),
    (0, typeorm_1.JoinColumn)([{ name: "UpdatedByUserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], Announcements.prototype, "updatedByUser", void 0);
Announcements = __decorate([
    (0, typeorm_1.Index)("Announcements_pkey", ["announcementId"], { unique: true }),
    (0, typeorm_1.Entity)("Announcements", { schema: "dbo" })
], Announcements);
exports.Announcements = Announcements;
//# sourceMappingURL=Announcements.js.map