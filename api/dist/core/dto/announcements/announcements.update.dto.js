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
exports.UpdateAnnouncementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const announcements_base_dto_1 = require("./announcements-base.dto");
class UpdateAnnouncementDto extends announcements_base_dto_1.DefaultAnnouncementDto {
    constructor() {
        super(...arguments);
        this.actions = "UPDATE";
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        var _a;
        return (_a = obj[key]) === null || _a === void 0 ? void 0 : _a.toString();
    }),
    __metadata("design:type", String)
], UpdateAnnouncementDto.prototype, "updatedByUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        default: "UPDATE"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(["UPDATE", "SEND"]),
    (0, class_validator_1.IsUppercase)(),
    __metadata("design:type", String)
], UpdateAnnouncementDto.prototype, "actions", void 0);
exports.UpdateAnnouncementDto = UpdateAnnouncementDto;
//# sourceMappingURL=announcements.update.dto.js.map