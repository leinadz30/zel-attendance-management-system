import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { CreateOperatorUserDto } from "src/core/dto/operators/operators.create.dto";
import { UpdateOperatorUserDto } from "src/core/dto/operators/operators.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Operators } from "src/db/entities/Operators";
import { OperatorsService } from "src/services/operators.service";
export declare class OperatorsController {
    private readonly operatorsService;
    constructor(operatorsService: OperatorsService);
    getDetails(operatorCode: string): Promise<ApiResponseModel<Operators>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Operators[];
        total: number;
    }>>;
    create(params: CreateOperatorUserDto): Promise<ApiResponseModel<Operators>>;
    update(operatorCode: string, dto: UpdateOperatorUserDto): Promise<ApiResponseModel<Operators>>;
    resetPassword(operatorCode: string, dto: UpdateUserResetPasswordDto): Promise<ApiResponseModel<Operators>>;
    approveAccessRequest(operatorCode: string): Promise<ApiResponseModel<Operators>>;
    delete(operatorCode: string): Promise<ApiResponseModel<Operators>>;
}
