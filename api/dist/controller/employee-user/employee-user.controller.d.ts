import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { CreateEmployeeUserDto, CreateEmployeeUserFromEmployeeDto } from "src/core/dto/employee-user/employee-user.create.dto";
import { UpdateEmployeeUserDto, UpdateEmployeeUserProfileDto } from "src/core/dto/employee-user/employee-user.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeUser } from "src/db/entities/EmployeeUser";
import { EmployeeUserService } from "src/services/employee-user.service";
export declare class EmployeeUserController {
    private readonly employeeUserService;
    constructor(employeeUserService: EmployeeUserService);
    getDetails(employeeCode: string): Promise<ApiResponseModel<EmployeeUser>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: EmployeeUser[];
        total: number;
    }>>;
    create(dto: CreateEmployeeUserDto): Promise<ApiResponseModel<EmployeeUser>>;
    createFromEmployee(dto: CreateEmployeeUserFromEmployeeDto): Promise<ApiResponseModel<EmployeeUser>>;
    update(employeeCode: string, dto: UpdateEmployeeUserDto): Promise<ApiResponseModel<EmployeeUser>>;
    updateProfile(employeeCode: string, dto: UpdateEmployeeUserProfileDto): Promise<ApiResponseModel<EmployeeUser>>;
    delete(employeeCode: string): Promise<ApiResponseModel<EmployeeUser>>;
    updatePassword(employeeCode: string, dto: UpdateUserResetPasswordDto): Promise<ApiResponseModel<EmployeeUser>>;
    approveAccessRequest(employeeCode: string): Promise<ApiResponseModel<EmployeeUser>>;
}
