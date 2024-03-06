import { AuthService } from "../../services/auth.service";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { LogInDto, LogInOrgDto } from "src/core/dto/auth/login.dto";
import { RegisterEmployeeUserDto } from "src/core/dto/auth/register-employee.dto";
import { RegisterParentUserDto } from "src/core/dto/auth/register-parent.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerEmployee(dto: RegisterEmployeeUserDto): Promise<ApiResponseModel<any>>;
    registerParent(dto: RegisterParentUserDto): Promise<ApiResponseModel<any>>;
    loginOperator(loginUserDto: LogInDto): Promise<ApiResponseModel<any>>;
    loginEmployeeUser(loginUserDto: LogInOrgDto): Promise<ApiResponseModel<any>>;
    loginParent(loginUserDto: LogInDto): Promise<ApiResponseModel<any>>;
}
