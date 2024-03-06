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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const operators_constant_1 = require("../common/constant/operators.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const user_type_constant_1 = require("../common/constant/user-type.constant");
const utils_1 = require("../common/utils/utils");
const Operators_1 = require("../db/entities/Operators");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let OperatorsService = class OperatorsService {
    constructor(operatorRepo) {
        this.operatorRepo = operatorRepo;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.operatorRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    user: true,
                },
                skip,
                take,
                order,
            }),
            this.operatorRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results: results.map((x) => {
                delete x.user.password;
                return x;
            }),
            total,
        };
    }
    async getByCode(operatorCode) {
        const res = await this.operatorRepo.findOne({
            where: {
                operatorCode,
                active: true,
            },
            relations: {
                user: true,
            },
        });
        if (!res) {
            throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
        }
        delete res.user.password;
        return res;
    }
    async create(dto) {
        return await this.operatorRepo.manager.transaction(async (entityManager) => {
            let user = new Users_1.Users();
            user.userType = user_type_constant_1.USER_TYPE.OPERATOR;
            user.userName = dto.userName;
            user.password = await (0, utils_1.hash)(dto.password);
            user = await entityManager.save(Users_1.Users, user);
            user.userCode = (0, utils_1.generateIndentityCode)(user.userId);
            user = await entityManager.save(Users_1.Users, user);
            let operator = new Operators_1.Operators();
            operator.user = user;
            operator.name = dto.name;
            operator = await entityManager.save(Operators_1.Operators, operator);
            operator.operatorCode = (0, utils_1.generateIndentityCode)(operator.operatorId);
            operator = await entityManager.save(Operators_1.Operators, operator);
            operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode: operator.operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            delete operator.user.password;
            return operator;
        });
    }
    async update(operatorCode, dto) {
        return await this.operatorRepo.manager.transaction(async (entityManager) => {
            let operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            if (!operator) {
                throw Error(operators_constant_1.OPERATORS_ERROR_NOT_FOUND);
            }
            operator.name = dto.name;
            operator = await entityManager.save(Operators_1.Operators, operator);
            operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            delete operator.user.password;
            return operator;
        });
    }
    async resetPassword(operatorCode, dto) {
        return await this.operatorRepo.manager.transaction(async (entityManager) => {
            let operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            if (!operator) {
                throw Error(operators_constant_1.OPERATORS_ERROR_NOT_FOUND);
            }
            const user = operator.user;
            user.password = await (0, utils_1.hash)(dto.password);
            await entityManager.save(Users_1.Users, user);
            operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            delete operator.user.password;
            return operator;
        });
    }
    async delete(operatorCode) {
        return await this.operatorRepo.manager.transaction(async (entityManager) => {
            let operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            if (!operator) {
                throw Error(operators_constant_1.OPERATORS_ERROR_NOT_FOUND);
            }
            operator.active = false;
            await entityManager.save(Operators_1.Operators, operator);
            const user = operator.user;
            user.active = false;
            await entityManager.save(Users_1.Users, user);
            operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                },
                relations: {
                    user: true,
                },
            });
            delete operator.user.password;
            return operator;
        });
    }
    async approveAccessRequest(operatorCode) {
        return await this.operatorRepo.manager.transaction(async (entityManager) => {
            let operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                    active: true,
                },
                relations: {
                    user: true,
                },
            });
            if (!operator) {
                throw Error(operators_constant_1.OPERATORS_ERROR_NOT_FOUND);
            }
            await entityManager.save(Operators_1.Operators, operator);
            operator = await entityManager.findOne(Operators_1.Operators, {
                where: {
                    operatorCode,
                },
                relations: {
                    user: true,
                },
            });
            delete operator.user.password;
            return operator;
        });
    }
};
OperatorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Operators_1.Operators)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OperatorsService);
exports.OperatorsService = OperatorsService;
//# sourceMappingURL=operators.service.js.map