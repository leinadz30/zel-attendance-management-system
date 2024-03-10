import { CreateEmployeeUserRoleDto } from "src/core/dto/employee-user-role/employee-user-role.create.dto";
import { UpdateEmployeeUserRoleDto } from "src/core/dto/employee-user-role/employee-user-role.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeUserRole } from "src/db/entities/EmployeeUserRole";
import { EmployeeUserRoleService } from "src/services/employee-user-role.service";
export declare class EmployeeUserRoleController {
    private readonly employeeUserRoleService;
    constructor(employeeUserRoleService: EmployeeUserRoleService);
    getDetails(employeeUserRoleCode: string): Promise<ApiResponseModel<EmployeeUserRole>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: EmployeeUserRole[];
        total: number;
    }>>;
    create(employeeUserRoleDto: CreateEmployeeUserRoleDto): Promise<ApiResponseModel<EmployeeUserRole>>;
    update(employeeUserRoleCode: string, dto: UpdateEmployeeUserRoleDto): Promise<ApiResponseModel<EmployeeUserRole>>;
    delete(employeeUserRoleCode: string): Promise<ApiResponseModel<EmployeeUserRole>>;
}
