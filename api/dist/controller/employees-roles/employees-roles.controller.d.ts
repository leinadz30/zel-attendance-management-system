import { CreateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.create.dto";
import { UpdateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeRoles } from "src/db/entities/EmployeeRoles";
import { EmployeeRolesService } from "src/services/employees-roles.service";
export declare class EmployeeRolesController {
    private readonly employeeRolesService;
    constructor(employeeRolesService: EmployeeRolesService);
    getDetails(employeeRolesCode: string): Promise<ApiResponseModel<EmployeeRoles>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: EmployeeRoles[];
        total: number;
    }>>;
    create(employeeRolesDto: CreateEmployeeRolesDto): Promise<ApiResponseModel<EmployeeRoles>>;
    update(employeeRolesCode: string, dto: UpdateEmployeeRolesDto): Promise<ApiResponseModel<EmployeeRoles>>;
    delete(employeeRolesCode: string): Promise<ApiResponseModel<EmployeeRoles>>;
}
