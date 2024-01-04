import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EMPLOYEEROLES_ERROR_NOT_FOUND } from "src/common/constant/employees-roles.constant";
import { SCHOOLS_ERROR_NOT_FOUND } from "src/common/constant/schools.constant";
import { CONST_QUERYCURRENT_TIMESTAMP } from "src/common/constant/timestamp.constant";
import { USER_ERROR_USER_NOT_FOUND } from "src/common/constant/user-error.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.create.dto";
import { UpdateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.update.dto";
import { EmployeeRoles } from "src/db/entities/EmployeeRoles";
import { Schools } from "src/db/entities/Schools";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class EmployeeRolesService {
  constructor(
    @InjectRepository(EmployeeRoles)
    private readonly employeeRolesRepo: Repository<EmployeeRoles>
  ) {}

  async getEmployeeRolesPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.employeeRolesRepo.find({
        where: {
          ...condition,
          active: true,
        },
        relations: {
          createdByUser: true,
          updatedByUser: true,
        },
        skip,
        take,
        order,
      }),
      this.employeeRolesRepo.count({
        where: {
          ...condition,
          active: true,
        },
      }),
    ]);
    return {
      results: results.map((x) => {
        delete x.createdByUser.password;
        if (x?.updatedByUser?.password) {
          delete x.updatedByUser.password;
        }
        return x;
      }),
      total,
    };
  }

  async getByCode(employeeRoleCode) {
    const result = await this.employeeRolesRepo.findOne({
      select: {
        name: true,
        employeeRolesPages: true,
      } as any,
      where: {
        employeeRoleCode,
        active: true,
      },
      relations: {
        createdByUser: true,
        updatedByUser: true,
      },
    });
    if (!result) {
      throw Error(EMPLOYEEROLES_ERROR_NOT_FOUND);
    }
    delete result.createdByUser.password;
    if (result?.updatedByUser?.password) {
      delete result.updatedByUser.password;
    }
    return result;
  }

  async create(dto: CreateEmployeeRolesDto) {
    return await this.employeeRolesRepo.manager.transaction(
      async (entityManager) => {
        let employeeRoles = new EmployeeRoles();
        employeeRoles.name = dto.name;
        employeeRoles.employeeRoleAccess = dto.employeeRoleAccess;

        const school = await entityManager.findOne(Schools, {
          where: {
            schoolId: dto.schoolId,
            active: true,
          },
        });
        if (!school) {
          throw Error(SCHOOLS_ERROR_NOT_FOUND);
        }
        employeeRoles.school = school;

        const timestamp = await entityManager
          .query(CONST_QUERYCURRENT_TIMESTAMP)
          .then((res) => {
            return res[0]["timestamp"];
          });
        employeeRoles.createdDate = timestamp;
        const createdByUser = await entityManager.findOne(Users, {
          where: {
            userId: dto.createdByUserId,
            active: true,
          },
        });
        if (!createdByUser) {
          throw Error(USER_ERROR_USER_NOT_FOUND);
        }
        employeeRoles.createdByUser = createdByUser;
        employeeRoles = await entityManager.save(employeeRoles);
        employeeRoles.employeeRoleCode = generateIndentityCode(
          employeeRoles.employeeRoleId
        );
        employeeRoles = await entityManager.save(EmployeeRoles, employeeRoles);
        delete employeeRoles.createdByUser.password;
        return employeeRoles;
      }
    );
  }

  async update(employeeRoleCode, dto: UpdateEmployeeRolesDto) {
    return await this.employeeRolesRepo.manager.transaction(
      async (entityManager) => {
        let employeeRoles = await entityManager.findOne(EmployeeRoles, {
          where: {
            employeeRoleCode,
            active: true,
          },
        });
        if (!employeeRoles) {
          throw Error(EMPLOYEEROLES_ERROR_NOT_FOUND);
        }
        employeeRoles.name = dto.name;
        employeeRoles.employeeRoleAccess = dto.employeeRoleAccess;
        const updatedByUser = await entityManager.findOne(Users, {
          where: {
            userId: dto.updatedByUserId,
            active: true,
          },
        });
        if (!updatedByUser) {
          throw Error(USER_ERROR_USER_NOT_FOUND);
        }
        employeeRoles.updatedByUser = updatedByUser;
        const timestamp = await entityManager
          .query(CONST_QUERYCURRENT_TIMESTAMP)
          .then((res) => {
            return res[0]["timestamp"];
          });
        employeeRoles.updatedDate = timestamp;
        employeeRoles = await entityManager.save(EmployeeRoles, employeeRoles);
        if (employeeRoles?.createdByUser?.password) {
          delete employeeRoles.createdByUser.password;
        }
        if (employeeRoles?.updatedByUser?.password) {
          delete employeeRoles.updatedByUser.password;
        }
        return employeeRoles;
      }
    );
  }

  async delete(employeeRoleCode) {
    return await this.employeeRolesRepo.manager.transaction(
      async (entityManager) => {
        let employeeRoles = await entityManager.findOne(EmployeeRoles, {
          where: {
            employeeRoleCode,
            active: true,
          },
        });
        if (!employeeRoles) {
          throw Error(EMPLOYEEROLES_ERROR_NOT_FOUND);
        }
        employeeRoles.active = false;
        const timestamp = await entityManager
          .query(CONST_QUERYCURRENT_TIMESTAMP)
          .then((res) => {
            return res[0]["timestamp"];
          });
        employeeRoles.updatedDate = timestamp;
        employeeRoles = await entityManager.save(EmployeeRoles, employeeRoles);
        if (employeeRoles?.createdByUser?.password) {
          delete employeeRoles.createdByUser.password;
        }
        if (employeeRoles?.updatedByUser?.password) {
          delete employeeRoles.updatedByUser.password;
        }
        return employeeRoles;
      }
    );
  }
}
