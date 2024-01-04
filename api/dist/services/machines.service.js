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
exports.MachinesService = void 0;
const Schools_1 = require("../db/entities/Schools");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const machines_constant_1 = require("../common/constant/machines.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const Machines_1 = require("../db/entities/Machines");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
const schools_constant_1 = require("../common/constant/schools.constant");
let MachinesService = class MachinesService {
    constructor(machinesRepo) {
        this.machinesRepo = machinesRepo;
    }
    async getMachinesPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.machinesRepo.find({
                where: Object.assign(Object.assign({}, condition), { active: true }),
                relations: {
                    createdByUser: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.machinesRepo.count({
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
    async getByCode(machineCode) {
        var _a;
        const result = await this.machinesRepo.findOne({
            where: {
                machineCode,
                active: true,
            },
            relations: {
                createdByUser: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
        }
        delete result.createdByUser.password;
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        try {
            return await this.machinesRepo.manager.transaction(async (entityManager) => {
                let machines = new Machines_1.Machines();
                machines.description = dto.description;
                machines.path = dto.path;
                machines.domain = dto.domain;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                machines.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                machines.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                machines.createdByUser = createdByUser;
                machines = await entityManager.save(machines);
                machines.machineCode = (0, utils_1.generateIndentityCode)(machines.machineId);
                machines = await entityManager.save(Machines_1.Machines, machines);
                delete machines.createdByUser.password;
                return machines;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_machine")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async batchCreate(dtos) {
        return await this.machinesRepo.manager.transaction(async (entityManager) => {
            const machines = [];
            for (const dto of dtos) {
                let machine = new Machines_1.Machines();
                machine.description = dto.description;
                machine.path = dto.path;
                machine.domain = dto.domain;
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                machine.createdDate = timestamp;
                const school = await entityManager.findOne(Schools_1.Schools, {
                    where: {
                        schoolId: dto.schoolId,
                        active: true,
                    },
                });
                if (!school) {
                    throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
                }
                machine.school = school;
                const createdByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.createdByUserId,
                        active: true,
                    },
                });
                if (!createdByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                machine.createdByUser = createdByUser;
                machine = await entityManager.save(machine);
                machine.machineCode = (0, utils_1.generateIndentityCode)(machine.machineId);
                machine = await entityManager.save(Machines_1.Machines, machine);
                delete machine.createdByUser.password;
                machines.push(machine);
            }
            return machines;
        });
    }
    async update(machineCode, dto) {
        try {
            return await this.machinesRepo.manager.transaction(async (entityManager) => {
                var _a, _b;
                let machines = await entityManager.findOne(Machines_1.Machines, {
                    where: {
                        machineCode,
                        active: true,
                    },
                });
                if (!machines) {
                    throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
                }
                const timestamp = await entityManager
                    .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                    .then((res) => {
                    return res[0]["timestamp"];
                });
                machines.updatedDate = timestamp;
                const updatedByUser = await entityManager.findOne(Users_1.Users, {
                    where: {
                        userId: dto.updatedByUserId,
                        active: true,
                    },
                });
                if (!updatedByUser) {
                    throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
                }
                machines.updatedByUser = updatedByUser;
                machines.description = dto.description;
                machines.path = dto.path;
                machines.domain = dto.domain;
                machines = await entityManager.save(Machines_1.Machines, machines);
                if ((_a = machines === null || machines === void 0 ? void 0 : machines.createdByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete machines.createdByUser.password;
                }
                if ((_b = machines === null || machines === void 0 ? void 0 : machines.updatedByUser) === null || _b === void 0 ? void 0 : _b.password) {
                    delete machines.updatedByUser.password;
                }
                return machines;
            });
        }
        catch (ex) {
            if (ex["message"] &&
                (ex["message"].includes("duplicate key") ||
                    ex["message"].includes("violates unique constraint")) &&
                ex["message"].includes("u_machine")) {
                throw Error("Entry already exists!");
            }
            else {
                throw ex;
            }
        }
    }
    async delete(machineCode) {
        return await this.machinesRepo.manager.transaction(async (entityManager) => {
            const machines = await entityManager.findOne(Machines_1.Machines, {
                where: {
                    machineCode,
                    active: true,
                },
            });
            if (!machines) {
                throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
            }
            machines.active = false;
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            machines.updatedDate = timestamp;
            return await entityManager.save(Machines_1.Machines, machines);
        });
    }
};
MachinesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Machines_1.Machines)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MachinesService);
exports.MachinesService = MachinesService;
//# sourceMappingURL=machines.service.js.map