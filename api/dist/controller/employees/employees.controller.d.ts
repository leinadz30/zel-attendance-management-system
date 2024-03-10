import { BatchCreateEmployeeDto } from "src/core/dto/employees/employees.batch-create.dto";
import { CreateEmployeeDto } from "src/core/dto/employees/employees.create.dto";
import { UpdateEmployeeDto } from "src/core/dto/employees/employees.update.dto";
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
    createBatch(employeeDtos: BatchCreateEmployeeDto[]): Promise<ApiResponseModel<{
        success: any[];
        failed: any[];
        warning: any[];
    }>>;
    update(employeeCode: string, dto: UpdateEmployeeDto): Promise<ApiResponseModel<Employees>>;
    delete(employeeCode: string): Promise<ApiResponseModel<Employees>>;
}
