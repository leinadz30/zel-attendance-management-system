import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  DELETE_SUCCESS,
  SAVING_SUCCESS,
  UPDATE_SUCCESS,
} from "src/common/constant/api-response.constant";
import { CreateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.create.dto";
import { UpdateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeRoles } from "src/db/entities/EmployeeRoles";
import { EmployeeRolesService } from "src/services/employees-roles.service";

@ApiTags("employeeRoles")
@Controller("employeeRoles")
export class EmployeeRolesController {
  constructor(private readonly employeeRolesService: EmployeeRolesService) {}

  @Get("/:employeeRolesCode")
  //   @UseGuards(JwtAuthGuard)
  async getDetails(@Param("employeeRolesCode") employeeRolesCode: string) {
    const res = {} as ApiResponseModel<EmployeeRoles>;
    try {
      res.data = await this.employeeRolesService.getByCode(employeeRolesCode);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginated(@Body() params: PaginationParamsDto) {
    const res: ApiResponseModel<{ results: EmployeeRoles[]; total: number }> =
      {} as any;
    try {
      res.data = await this.employeeRolesService.getEmployeeRolesPagination(
        params
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("")
  //   @UseGuards(JwtAuthGuard)
  async create(@Body() employeeRolesDto: CreateEmployeeRolesDto) {
    const res: ApiResponseModel<EmployeeRoles> = {} as any;
    try {
      res.data = await this.employeeRolesService.create(employeeRolesDto);
      res.success = true;
      res.message = `Employee Roles ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/:employeeRolesCode")
  //   @UseGuards(JwtAuthGuard)
  async update(
    @Param("employeeRolesCode") employeeRolesCode: string,
    @Body() dto: UpdateEmployeeRolesDto
  ) {
    const res: ApiResponseModel<EmployeeRoles> = {} as any;
    try {
      res.data = await this.employeeRolesService.update(employeeRolesCode, dto);
      res.success = true;
      res.message = `Employee Roles ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/:employeeRolesCode")
  //   @UseGuards(JwtAuthGuard)
  async delete(@Param("employeeRolesCode") employeeRolesCode: string) {
    const res: ApiResponseModel<EmployeeRoles> = {} as any;
    try {
      res.data = await this.employeeRolesService.delete(employeeRolesCode);
      res.success = true;
      res.message = `Employee Roles ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
