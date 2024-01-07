import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import {
  DELETE_SUCCESS,
  SAVING_SUCCESS,
  UPDATE_SUCCESS,
} from "src/common/constant/api-response.constant";
import { BatchCreateEmployeeDto } from "src/core/dto/employees/employees.batch-create.dto";
import {
  CreateEmployeeDto,
  CreateEmployeeUserDto,
} from "src/core/dto/employees/employees.create.dto";
import {
  UpdateEmployeeDto,
  UpdateEmployeeUserDto,
  UpdateEmployeeUserProfileDto,
} from "src/core/dto/employees/employees.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Employees } from "src/db/entities/Employees";
import { EmployeesService } from "src/services/employees.service";

@ApiTags("employees")
@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get("/:employeeCode")
  //   @UseGuards(JwtAuthGuard)
  async getDetails(@Param("employeeCode") employeeCode: string) {
    const res = {} as ApiResponseModel<Employees>;
    try {
      res.data = await this.employeesService.getByCode(employeeCode);
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
    const res: ApiResponseModel<{ results: Employees[]; total: number }> =
      {} as any;
    try {
      res.data = await this.employeesService.getPagination(params);
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
  async create(@Body() employeesDto: CreateEmployeeDto) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.create(employeesDto);
      res.success = true;
      res.message = `Employee ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("createEmployeeUser")
  //   @UseGuards(JwtAuthGuard)
  async createEmployeeUser(@Body() employeesDto: CreateEmployeeUserDto) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.createEmployeeUser(employeesDto);
      res.success = true;
      res.message = `Employee ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @ApiBody({
    isArray: true,
    type: BatchCreateEmployeeDto,
  })
  @Post("createBatch")
  //   @UseGuards(JwtAuthGuard)
  async createBatch(@Body() employeeDtos: BatchCreateEmployeeDto[]) {
    const res: ApiResponseModel<{
      success: any[];
      failed: any[];
      duplicates: any[];
    }> = {} as any;
    try {
      res.data = await this.employeesService.createBatch(employeeDtos);
      res.success = true;
      res.message = `Employee Batch Complete`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/:employeeCode")
  //   @UseGuards(JwtAuthGuard)
  async update(
    @Param("employeeCode") employeeCode: string,
    @Body() dto: UpdateEmployeeDto
  ) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.update(employeeCode, dto);
      res.success = true;
      res.message = `Employee ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("updateEmployeeUser/:employeeCode")
  //   @UseGuards(JwtAuthGuard)
  async updateEmployeeUser(
    @Param("employeeCode") employeeCode: string,
    @Body() dto: UpdateEmployeeUserDto
  ) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.updateEmployeeUser(
        employeeCode,
        dto
      );
      res.success = true;
      res.message = `Employee ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("updateProfile/:employeeCode")
  //   @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Param("employeeCode") employeeCode: string,
    @Body() dto: UpdateEmployeeDto
  ) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.updateProfile(employeeCode, dto);
      res.success = true;
      res.message = `Employee ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("approveAccessRequest/:employeeCode")
  //   @UseGuards(JwtAuthGuard)
  async approveAccessRequest(@Param("employeeCode") employeeCode: string) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.approveAccessRequest(employeeCode);
      res.success = true;
      res.message = `Employee ${UPDATE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/:employeeCode")
  //   @UseGuards(JwtAuthGuard)
  async delete(@Param("employeeCode") employeeCode: string) {
    const res: ApiResponseModel<Employees> = {} as any;
    try {
      res.data = await this.employeesService.delete(employeeCode);
      res.success = true;
      res.message = `Employee ${DELETE_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
