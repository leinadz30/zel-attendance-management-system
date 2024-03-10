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
exports.AnnouncementRecipient = void 0;
const typeorm_1 = require("typeorm");
const Announcements_1 = require("./Announcements");
let AnnouncementRecipient = class AnnouncementRecipient {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "AnnouncementId" }),
    __metadata("design:type", String)
], AnnouncementRecipient.prototype, "announcementId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { primary: true, name: "Type" }),
    __metadata("design:type", String)
], AnnouncementRecipient.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "GroupReferenceId" }),
    __metadata("design:type", String)
], AnnouncementRecipient.prototype, "groupReferenceId", void 0);
__decorate([
    (0, typeorm_1.Column)("int8", { name: "ExcludedIds", nullable: true, array: true }),
    __metadata("design:type", Array)
], AnnouncementRecipient.prototype, "excludedIds", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Announcements_1.Announcements, (announcements) => announcements.announcementRecipients),
    (0, typeorm_1.JoinColumn)([
        { name: "AnnouncementId", referencedColumnName: "announcementId" },
    ]),
    __metadata("design:type", Announcements_1.Announcements)
], AnnouncementRecipient.prototype, "announcement", void 0);
AnnouncementRecipient = __decorate([
    (0, typeorm_1.Index)("AnnouncementRecipient_pkey", ["announcementId", "groupReferenceId", "type"], { unique: true }),
    (0, typeorm_1.Entity)("AnnouncementRecipient", { schema: "dbo" })
], AnnouncementRecipient);
exports.AnnouncementRecipient = AnnouncementRecipient;
//# sourceMappingURL=AnnouncementRecipient.js.map