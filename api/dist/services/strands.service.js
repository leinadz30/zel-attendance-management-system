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
exports.StrandsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const schools_constant_1 = require("../common/constant/schools.constant");
const strand_constant_1 = require("../common/constant/strand.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Schools_1 = require("../db/entities/Schools");
const Strands_1 = require("../db/entities/Strands");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
let StrandsService = class StrandsService {
    constructor(strandsRepo) {
        this.strandsRepo = strandsRepo;
    }
    async getStrandsPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.strandsRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.strandsRepo.count({
                where: Object.assign(Object.assign({}, condition), { active: true }),
            }),
        ]);
        return {
            results: results.map((x) => {
                var _a;
                delete x.createdByUser.password;
                if ((_a = x === null || x === void 0 ? void 0 : x.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete x.updatedByUser.password;
                }
                return x;
            }),
            total,
        };
    }
    async getByCode(strandCode) {
        var _a;
        const result = await this.strandsRepo.findOne({
            where: {
                strandCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(strand_constant_1.STRAND_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.strandsRepo.manager.transaction(async (entityManager) => {
                let strands = new Strands_1.Strands();
                strands.name = dto.name;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                strands.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                strands.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                strands.createdByUser = createdByUser;
                strands = await entityManager.save(strands);
                strands.strandCode = (0, utils_1.generateIndentityCode)(strands.strandId);
                strands = await entityManager.save(Strands_1.Strands, strands);
                delete strands.createdByUser.password;
                return strands;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_strand")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async update(strandCode, dto) {
        try {
            return await this.strandsRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                let strands = await entityManager.findOne(Strands_1.Strands, {
                    where: {
                        strandCode,
                        active: true,
                    },
                });
                if (!strands) {
                    throw Error(strand_constant_1.STRAND_ERROR_NOT_FOUND);
                }
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                strands.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                strands.updatedByUser = updatedByUser;
                strands.name = dto.name;
                strands = await entityManager.save(Strands_1.Strands, strands);
                if ((_a = strands === null || strands === void 0 ? void 0 : strands.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete strands.createdByUser.password;
                }
                if ((_b = strands === null || strands === void 0 ? void 0 : strands.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete strands.updatedByUser.password;
                }
                return strands;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_strand")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(strandCode) {
        return await this.strandsRepo.manager.transaction(async (entityManager) => {
            var _a;
            let strands = await entityManager.findOne(Strands_1.Strands, {
                where: {
                    strandCode,
                    active: true,
                },
            });
            if (!strands) {
                throw Error(strand_constant_1.STRAND_ERROR_NOT_FOUND);
            }
            strands.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            strands.updatedDate = timestamp;
            strands = await entityManager.save(Strands_1.Strands, strands);
            delete strands.createdByUser.password;
            if ((_a = strands === null || strands === void 0 ? void 0 : strands.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                delete strands.updatedByUser.password;
            }
            return strands;
        });
    }
};
StrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Strands_1.Strands)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StrandsService);
exports.StrandsService = StrandsService;
//# sourceMappingURL=strands.service.js.map