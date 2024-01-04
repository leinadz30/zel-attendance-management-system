import { EMPLOYEETITLES_ERROR_NOT_FOUND } from "./../common/constant/employee-titles.constant";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import moment from "moment";
import { DEPARTMENTS_ERROR_NOT_FOUND } from "src/common/constant/departments.constant";
import { EMPLOYEEROLES_ERROR_NOT_FOUND } from "src/common/constant/employees-roles.constant";
import { EMPLOYEES_ERROR_NOT_FOUND } from "src/common/constant/employees.constant";
import { SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND } from "src/common/constant/school-year-levels.constant";
import { SCHOOLS_ERROR_NOT_FOUND } from "src/common/constant/schools.constant";
import { CONST_QUERYCURRENT_TIMESTAMP } from "src/common/constant/timestamp.constant";
import { USER_ERROR_USER_NOT_FOUND } from "src/common/constant/user-error.constant";
import { USER_TYPE } from "src/common/constant/user-type.constant";
import {
  columnDefToTypeORMCondition,
  hash,
  generateIndentityCode,
} from "src/common/utils/utils";
import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import {
  CreateEmployeeDto,
  CreateEmployeeUserDto,
} from "src/core/dto/employees/employees.create.dto";
import {
  UpdateEmployeeDto,
  UpdateEmployeeUserDto,
  UpdateEmployeeUserProfileDto,
} from "src/core/dto/employees/employees.update.dto";
import { Courses } from "src/db/entities/Courses";
import { Departments } from "src/db/entities/Departments";
import { EmployeeRoles } from "src/db/entities/EmployeeRoles";
import { EmployeeTitles } from "src/db/entities/EmployeeTitles";
import { EmployeeUser } from "src/db/entities/EmployeeUser";
import { Employees } from "src/db/entities/Employees";
import { SchoolYearLevels } from "src/db/entities/SchoolYearLevels";
import { Schools } from "src/db/entities/Schools";
import { Sections } from "src/db/entities/Sections";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private readonly employeeRepo: Repository<Employees>
  ) {}

  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);
    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.employeeRepo.find({
        where: {
          ...condition,
          active: true,
        },
        relations: {
          department: true,
          createdByUser: true,
          updatedByUser: true,
          school: true,
          employeeUser: {
            user: true,
          },
        },
        skip,
        take,
        order,
      }),
      this.employeeRepo.count({
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

  async getByCode(employeeCode) {
    const res = await this.employeeRepo.findOne({
      where: {
        employeeCode,
        active: true,
      },
      relations: {
        department: true,
        createdByUser: true,
        updatedByUser: true,
        school: true,
        employeePosition: true,
        employeeUser: {
          user: true,
          employeeRole: true,
        },
      },
    });

    if (!res) {
      throw Error(EMPLOYEES_ERROR_NOT_FOUND);
    }
    delete res.employeeUser?.user?.password;
    delete res.createdByUser.password;
    if (res?.updatedByUser?.password) {
      delete res.updatedByUser.password;
    }
    return res;
  }

  async create(dto: CreateEmployeeDto) {
    try {
      return await this.employeeRepo.manager.transaction(
        async (entityManager) => {
          const school = await entityManager.findOne(Schools, {
            where: {
              schoolId: dto.schoolId,
              active: true,
            },
          });
          if (!school) {
            throw Error(SCHOOLS_ERROR_NOT_FOUND);
          }
          let employee = new Employees();
          employee.school = school;
          employee.accessGranted = true;
          employee.firstName = dto.firstName;
          employee.middleInitial = dto.middleInitial;
          employee.lastName = dto.lastName;
          employee.fullName = `${dto.firstName} ${dto.lastName}`;
          employee.mobileNumber = dto.mobileNumber;
          employee.cardNumber = dto.cardNumber;
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          employee.createdDate = timestamp;

          const registeredByUser = await entityManager.findOne(Users, {
            where: {
              userId: dto.createdByUserId,
              active: true,
            },
          });
          if (!registeredByUser) {
            throw Error(USER_ERROR_USER_NOT_FOUND);
          }
          employee.createdByUser = registeredByUser;

          const department = await entityManager.findOne(Departments, {
            where: {
              departmentId: dto.departmentId,
              school: {
                schoolId: dto.schoolId,
              },
              active: true,
            },
          });
          if (!department) {
            throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
          }
          employee.department = department;

          const employeePosition = await entityManager.findOne(EmployeeTitles, {
            where: {
              employeeTitleId: dto.employeeTitleId,
              school: {
                schoolId: dto.schoolId,
              },
              active: true,
            },
          });
          if (!employeePosition) {
            throw Error(SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
          }
          employee.employeePosition = employeePosition;

          employee = await entityManager.save(Employees, employee);
          employee.employeeCode = generateIndentityCode(employee.employeeId);
          employee = await entityManager.save(Employees, employee);

          employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode: employee.employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });
          delete employee.employeeUser?.user?.password;
          delete employee.createdByUser.password;
          return employee;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user")
      ) {
        throw Error("Username already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_number")
      ) {
        throw Error("Mobile number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_card")
      ) {
        throw Error("Card number already used!");
      } else {
        throw ex;
      }
    }
  }

  async createEmployeeUser(dto: CreateEmployeeUserDto) {
    try {
      return await this.employeeRepo.manager.transaction(
        async (entityManager) => {
          const school = await entityManager.findOne(Schools, {
            where: {
              schoolId: dto.schoolId,
              active: true,
            },
          });
          if (!school) {
            throw Error(SCHOOLS_ERROR_NOT_FOUND);
          }

          let user = new Users();
          user.userType = USER_TYPE.EMPLOYEE;
          user.userName = dto.userName;
          user.password = await hash(dto.password);
          user = await entityManager.save(Users, user);

          let employee = new Employees();
          employee.school = school;
          employee.accessGranted = true;
          employee.firstName = dto.firstName;
          employee.middleInitial = dto.middleInitial;
          employee.lastName = dto.lastName;
          employee.fullName = `${dto.firstName} ${dto.lastName}`;
          employee.mobileNumber = dto.mobileNumber;
          employee.cardNumber = dto.cardNumber;
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          employee.createdDate = timestamp;

          const registeredByUser = await entityManager.findOne(Users, {
            where: {
              userId: dto.createdByUserId,
              active: true,
            },
          });
          if (!registeredByUser) {
            throw Error(USER_ERROR_USER_NOT_FOUND);
          }
          employee.createdByUser = registeredByUser;

          const department = await entityManager.findOne(Departments, {
            where: {
              departmentId: dto.departmentId,
              school: {
                schoolId: dto.schoolId,
              },
              active: true,
            },
          });
          if (!department) {
            throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
          }
          employee.department = department;

          const employeePosition = await entityManager.findOne(EmployeeTitles, {
            where: {
              employeeTitleId: dto.employeeTitleId,
              school: {
                schoolId: dto.schoolId,
              },
              active: true,
            },
          });
          if (!employeePosition) {
            throw Error(SCHOOL_YEAR_LEVELS_ERROR_NOT_FOUND);
          }
          employee.employeePosition = employeePosition;

          employee = await entityManager.save(Employees, employee);
          employee.employeeCode = generateIndentityCode(employee.employeeId);
          employee = await entityManager.save(Employees, employee);

          let employeeUser = new EmployeeUser();
          employeeUser.user = user;
          employeeUser.employee = employee;
          employeeUser.dateRegistered = timestamp;

          const employeeRole = await entityManager.findOne(EmployeeRoles, {
            where: {
              employeeRoleId: dto.employeeRoleId,
              school: {
                schoolId: dto.schoolId,
              },
              active: true,
            },
          });
          if (!employeeRole) {
            throw Error(EMPLOYEEROLES_ERROR_NOT_FOUND);
          }
          employeeUser.employeeRole = employeeRole;
          employeeUser = await entityManager.save(EmployeeUser, employeeUser);

          employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode: employee.employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });
          delete employee.employeeUser?.user?.password;
          delete employee.createdByUser.password;
          return employee;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user")
      ) {
        throw Error("Username already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_number")
      ) {
        throw Error("Mobile number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_card")
      ) {
        throw Error("Card number already used!");
      } else {
        throw ex;
      }
    }
  }

  async updateProfile(employeeCode, dto: UpdateEmployeeDto) {
    try {
      return await this.employeeRepo.manager.transaction(
        async (entityManager) => {
          let employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });

          if (!employee) {
            throw Error(EMPLOYEES_ERROR_NOT_FOUND);
          }

          employee.firstName = dto.firstName;
          employee.middleInitial = dto.middleInitial;
          employee.lastName = dto.lastName;
          employee.fullName = `${dto.firstName} ${dto.lastName}`;
          employee.mobileNumber = dto.mobileNumber;
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          employee.updatedDate = timestamp;
          employee.updatedByUser = employee.employeeUser?.user;

          const department = await entityManager.findOne(Departments, {
            where: {
              departmentId: dto.departmentId,
              active: true,
            },
          });
          if (!department) {
            throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
          }
          employee.department = department;

          const employeePosition = await entityManager.findOne(EmployeeTitles, {
            where: {
              employeeTitleId: dto.employeeTitleId,
              school: {
                schoolId: employee.school.schoolId,
              },
              active: true,
            },
          });
          if (!employeePosition) {
            throw Error(EMPLOYEETITLES_ERROR_NOT_FOUND);
          }
          employee.employeePosition = employeePosition;
          employee = await entityManager.save(Employees, employee);

          employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });
          delete employee.employeeUser?.user.password;
          delete employee.createdByUser.password;
          if (employee?.updatedByUser?.password) {
            delete employee.updatedByUser.password;
          }
          return employee;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user")
      ) {
        throw Error("Username already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_number")
      ) {
        throw Error("Mobile number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_card")
      ) {
        throw Error("Card number already used!");
      } else {
        throw ex;
      }
    }
  }

  async update(employeeCode, dto: UpdateEmployeeDto) {
    try {
      return await this.employeeRepo.manager.transaction(
        async (entityManager) => {
          let employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });

          if (!employee) {
            throw Error(EMPLOYEES_ERROR_NOT_FOUND);
          }

          employee.firstName = dto.firstName;
          employee.middleInitial = dto.middleInitial;
          employee.lastName = dto.lastName;
          employee.fullName = `${dto.firstName} ${dto.lastName}`;
          employee.mobileNumber = dto.mobileNumber;
          employee.cardNumber = dto.cardNumber;
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          employee.updatedDate = timestamp;

          const updatedByUser = await entityManager.findOne(Users, {
            where: {
              userId: dto.updatedByUserId,
              active: true,
            },
          });
          if (!updatedByUser) {
            throw Error(USER_ERROR_USER_NOT_FOUND);
          }
          employee.updatedByUser = updatedByUser;

          const department = await entityManager.findOne(Departments, {
            where: {
              departmentId: dto.departmentId,
              active: true,
            },
          });
          if (!department) {
            throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
          }
          employee.department = department;

          const employeePosition = await entityManager.findOne(EmployeeTitles, {
            where: {
              employeeTitleId: dto.employeeTitleId,
              school: {
                schoolId: employee.school.schoolId,
              },
              active: true,
            },
          });
          if (!employeePosition) {
            throw Error(EMPLOYEETITLES_ERROR_NOT_FOUND);
          }
          employee.employeePosition = employeePosition;
          employee = await entityManager.save(Employees, employee);

          employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });
          delete employee.employeeUser?.user?.password;
          delete employee.createdByUser.password;
          if (employee?.updatedByUser?.password) {
            delete employee.updatedByUser.password;
          }
          return employee;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user")
      ) {
        throw Error("Username already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_number")
      ) {
        throw Error("Mobile number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_card")
      ) {
        throw Error("Card number already used!");
      } else {
        throw ex;
      }
    }
  }

  async updateEmployeeUser(employeeCode, dto: UpdateEmployeeUserDto) {
    try {
      return await this.employeeRepo.manager.transaction(
        async (entityManager) => {
          let employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });

          if (!employee) {
            throw Error(EMPLOYEES_ERROR_NOT_FOUND);
          }

          employee.firstName = dto.firstName;
          employee.middleInitial = dto.middleInitial;
          employee.lastName = dto.lastName;
          employee.fullName = `${dto.firstName} ${dto.lastName}`;
          employee.mobileNumber = dto.mobileNumber;
          employee.cardNumber = dto.cardNumber;
          const timestamp = await entityManager
            .query(CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
              return res[0]["timestamp"];
            });
          employee.updatedDate = timestamp;

          const updatedByUser = await entityManager.findOne(Users, {
            where: {
              userId: dto.updatedByUserId,
              active: true,
            },
          });
          if (!updatedByUser) {
            throw Error(USER_ERROR_USER_NOT_FOUND);
          }
          employee.updatedByUser = updatedByUser;

          const department = await entityManager.findOne(Departments, {
            where: {
              departmentId: dto.departmentId,
              active: true,
            },
          });
          if (!department) {
            throw Error(DEPARTMENTS_ERROR_NOT_FOUND);
          }
          employee.department = department;

          const employeePosition = await entityManager.findOne(EmployeeTitles, {
            where: {
              employeeTitleId: dto.employeeTitleId,
              school: {
                schoolId: employee.school.schoolId,
              },
              active: true,
            },
          });
          if (!employeePosition) {
            throw Error(EMPLOYEETITLES_ERROR_NOT_FOUND);
          }
          employee.employeePosition = employeePosition;
          employee = await entityManager.save(Employees, employee);

          let employeeUser = await entityManager.findOne(EmployeeUser, {
            where: {
              employee: {
                employeeId: employee.employeeId,
              },
            },
          });

          const employeeRole = await entityManager.findOne(EmployeeRoles, {
            where: {
              employeeRoleId: dto.employeeRoleId,
              school: {
                schoolId: employee.school.schoolId,
              },
              active: true,
            },
          });
          if (!employeeRole) {
            throw Error(EMPLOYEEROLES_ERROR_NOT_FOUND);
          }
          employeeUser.employeeRole = employeeRole;
          employeeUser = await entityManager.save(EmployeeUser, employeeUser);

          employee = await entityManager.findOne(Employees, {
            where: {
              employeeCode,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          });
          delete employee.employeeUser?.user?.password;
          delete employee.createdByUser.password;
          if (employee?.updatedByUser?.password) {
            delete employee.updatedByUser.password;
          }
          return employee;
        }
      );
    } catch (ex) {
      if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_user")
      ) {
        throw Error("Username already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_number")
      ) {
        throw Error("Mobile number already used!");
      } else if (
        ex["message"] &&
        (ex["message"].includes("duplicate key") ||
          ex["message"].includes("violates unique constraint")) &&
        ex["message"].includes("u_employees_card")
      ) {
        throw Error("Card number already used!");
      } else {
        throw ex;
      }
    }
  }

  async resetPassword(employeeCode, dto: UpdateUserResetPasswordDto) {
    return await this.employeeRepo.manager.transaction(
      async (entityManager) => {
        let employee = await entityManager.findOne(Employees, {
          where: {
            employeeCode,
            active: true,
          },
          relations: {
            employeeUser: {
              user: true,
            },
          },
        });

        if (!employee) {
          throw Error(EMPLOYEES_ERROR_NOT_FOUND);
        }

        const user = employee.employeeUser?.user;
        user.password = await hash(dto.password);
        await entityManager.save(Users, user);
        employee = await entityManager.findOne(Employees, {
          where: {
            employeeCode,
            active: true,
          },
          relations: {
            department: true,
            createdByUser: true,
            updatedByUser: true,
            school: true,
            employeePosition: true,
            employeeUser: {
              user: true,
              employeeRole: true,
            },
          },
        });
        delete employee.employeeUser?.user?.password;
        delete employee.createdByUser.password;
        if (employee?.updatedByUser?.password) {
          delete employee.updatedByUser.password;
        }
        return employee;
      }
    );
  }

  async delete(employeeCode) {
    return await this.employeeRepo.manager.transaction(
      async (entityManager) => {
        let employee = await entityManager.findOne(Employees, {
          where: {
            employeeCode,
            active: true,
          },
          relations: {
            department: true,
            createdByUser: true,
            updatedByUser: true,
            school: true,
            employeePosition: true,
            employeeUser: {
              user: true,
              employeeRole: true,
            },
          },
        });

        if (!employee) {
          throw Error(EMPLOYEES_ERROR_NOT_FOUND);
        }

        employee.active = false;
        await entityManager.save(Employees, employee);
        const user = await entityManager.findOne(Users, {
          where: {
            userId: employee.employeeUser.userId,
          },
        });
        user.active = false;
        const employeeUser = await entityManager.findOne(EmployeeUser, {
          where: {
            employee: {
              employeeId: employee.employeeId,
            },
          },
        });
        await entityManager.delete(EmployeeUser, employeeUser);
        employee = await entityManager.findOne(Employees, {
          where: {
            employeeCode,
          },
          relations: {
            department: true,
            createdByUser: true,
            updatedByUser: true,
            school: true,
            employeePosition: true,
            employeeUser: {
              user: true,
              employeeRole: true,
            },
          },
        });
        delete employee.employeeUser?.user?.password;
        delete employee.createdByUser.password;
        if (employee?.updatedByUser?.password) {
          delete employee.updatedByUser.password;
        }
        return employee;
      }
    );
  }

  async approveAccessRequest(employeeCode) {
    return await this.employeeRepo.manager.transaction(
      async (entityManager) => {
        let employee = await entityManager.findOne(Employees, {
          where: {
            employeeCode,
            active: true,
          },
          relations: {
            department: true,
            createdByUser: true,
            updatedByUser: true,
            school: true,
            employeePosition: true,
            employeeUser: {
              user: true,
              employeeRole: true,
            },
          },
        });

        if (!employee) {
          throw Error(EMPLOYEES_ERROR_NOT_FOUND);
        }

        employee.accessGranted = true;
        await entityManager.save(Employees, employee);
        employee = await entityManager.findOne(Employees, {
          where: {
            employeeCode,
          },
          relations: {
            department: true,
            createdByUser: true,
            updatedByUser: true,
            school: true,
            employeePosition: true,
            employeeUser: {
              user: true,
              employeeRole: true,
            },
          },
        });
        delete employee.employeeUser?.user?.password;
        delete employee.createdByUser.password;
        if (employee?.updatedByUser?.password) {
          delete employee.updatedByUser.password;
        }
        return employee;
      }
    );
  }
}
