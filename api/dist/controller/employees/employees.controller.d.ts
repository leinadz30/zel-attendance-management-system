import { CreateEmployeeDto, CreateEmployeeUserDto } from "src/core/dto/employees/employees.create.dto";
import { UpdateEmployeeDto, UpdateEmployeeUserDto } from "src/core/dto/employees/employees.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Employees } from "src/db/entities/Employees";
import { EmployeesService } from "src/services/employees.service";
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    getDetails(employeeCode: string): Promise<ApiResponseModel<Employees>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Employees[];
        total: number;
    }>>;
    create(employeesDto: CreateEmployeeDto): Promise<ApiResponseModel<Employees>>;
    createEmployeeUser(employeesDto: CreateEmployeeUserDto): Promise<ApiResponseModel<Employees>>;
    update(employeeCode: string, dto: UpdateEmployeeDto): Promise<ApiResponseModel<Employees>>;
    updateEmployeeUser(employeeCode: string, dto: UpdateEmployeeUserDto): Promise<ApiResponseModel<Employees>>;
    updateProfile(employeeCode: string, dto: UpdateEmployeeDto): Promise<ApiResponseModel<Employees>>;
    approveAccessRequest(employeeCode: string): Promise<ApiResponseModel<Employees>>;
    delete(employeeCode: string): Promise<ApiResponseModel<Employees>>;
}
