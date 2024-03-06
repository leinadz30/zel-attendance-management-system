import { CreateEmployeeUserRolesDto } from "src/core/dto/employee-user-role/employee-user-role.create.dto";
import { UpdateEmployeeUserRolesDto } from "src/core/dto/employee-user-role/employee-user-role.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeUserRolesService } from "src/services/employees-roles.service";
export declare class EmployeeUserRolesController {
    private readonly employeeRolesService;
    constructor(employeeRolesService: EmployeeUserRolesService);
    getDetails(employeeRolesCode: string): Promise<ApiResponseModel<EmployeeUserRoles>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: EmployeeUserRoles[];
        total: number;
    }>>;
    create(employeeRolesDto: CreateEmployeeUserRolesDto): Promise<ApiResponseModel<EmployeeUserRoles>>;
    update(employeeRolesCode: string, dto: UpdateEmployeeUserRolesDto): Promise<ApiResponseModel<EmployeeUserRoles>>;
    delete(employeeRolesCode: string): Promise<ApiResponseModel<EmployeeUserRoles>>;
}
