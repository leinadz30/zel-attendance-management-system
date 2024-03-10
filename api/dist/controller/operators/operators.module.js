"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorsModule = void 0;
const common_1 = require("@nestjs/common");
const operators_controller_1 = require("./operators.controller");
const Operators_1 = require("../../db/entities/Operators");
const operators_service_1 = require("../../services/operators.service");
const typeorm_1 = require("@nestjs/typeorm");
let OperatorsModule = class OperatorsModule {
};
OperatorsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Operators_1.Operators])],
        controllers: [operators_controller_1.OperatorsController],
        providers: [operators_service_1.OperatorsService],
        exports: [operators_service_1.OperatorsService],
    })
], OperatorsModule);
exports.OperatorsModule = OperatorsModule;
//# sourceMappingURL=operators.module.js.map