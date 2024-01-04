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
exports.CreateEmployeeUserDto = exports.CreateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const employees_base_dto_1 = require("./employees-base.dto");
class CreateEmployeeDto extends employees_base_dto_1.DefaultEmployeeUserDto {
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
], CreateEmployeeDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        var _a;
        return (_a = obj[key]) === null || _a === void 0 ? void 0 : _a.toString();
    }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "createdByUserId", void 0);
exports.CreateEmployeeDto = CreateEmployeeDto;
class CreateEmployeeUserDto extends employees_base_dto_1.DefaultEmployeeUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        return obj[key].toString();
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        var _a;
        return (_a = obj[key]) === null || _a === void 0 ? void 0 : _a.toString();
    }),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "schoolId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        var _a;
        return (_a = obj[key]) === null || _a === void 0 ? void 0 : _a.toString();
    }),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "createdByUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    (0, class_transformer_1.Transform)(({ obj, key }) => {
        var _a;
        return (_a = obj[key]) === null || _a === void 0 ? void 0 : _a.toString();
    }),
    __metadata("design:type", String)
], CreateEmployeeUserDto.prototype, "employeeRoleId", void 0);
exports.CreateEmployeeUserDto = CreateEmployeeUserDto;
//# sourceMappingURL=employees.create.dto.js.map