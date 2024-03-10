import { CreateEmployeeUserAccessDto } from "src/core/dto/employee-user-access/employee-user-access.create.dto";
import { UpdateEmployeeUserAccessDto } from "src/core/dto/employee-user-access/employee-user-access.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeUserAccess } from "src/db/entities/EmployeeUserAccess";
import { EmployeeUserAccessService } from "src/services/employee-user-access.service";
export declare class EmployeeUserAccessController {
    private readonly employeeUserAccessService;
    constructor(employeeUserAccessService: EmployeeUserAccessService);
    getDetails(employeeUserAccessCode: string): Promise<ApiResponseModel<EmployeeUserAccess>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: EmployeeUserAccess[];
        total: number;
    }>>;
    create(employeeUserAccessDto: CreateEmployeeUserAccessDto): Promise<ApiResponseModel<EmployeeUserAccess>>;
    update(employeeUserAccessCode: string, dto: UpdateEmployeeUserAccessDto): Promise<ApiResponseModel<EmployeeUserAccess>>;
    delete(employeeUserAccessCode: string): Promise<ApiResponseModel<EmployeeUserAccess>>;
}
