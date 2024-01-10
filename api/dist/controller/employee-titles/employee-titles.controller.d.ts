import { BatchCreateEmployeeTitleDto, CreateEmployeeTitleDto } from "src/core/dto/employee-titles/employee-titles.create.dto";
import { UpdateEmployeeTitleDto } from "src/core/dto/employee-titles/employee-titles.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { EmployeeTitles } from "src/db/entities/EmployeeTitles";
import { EmployeeTitlesService } from "src/services/employee-titles.service";
export declare class EmployeeTitlesController {
    private readonly employeeTitlesService;
    constructor(employeeTitlesService: EmployeeTitlesService);
    getDetails(employeeTitleCode: string): Promise<ApiResponseModel<EmployeeTitles>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: EmployeeTitles[];
        total: number;
    }>>;
    create(employeeTitlesDto: CreateEmployeeTitleDto): Promise<ApiResponseModel<EmployeeTitles>>;
    batchCreate(dtos: BatchCreateEmployeeTitleDto[]): Promise<ApiResponseModel<{
        success: any[];
        failed: any[];
        warning: any[];
    }>>;
    update(employeeTitleCode: string, dto: UpdateEmployeeTitleDto): Promise<ApiResponseModel<EmployeeTitles>>;
    delete(employeeTitleCode: string): Promise<ApiResponseModel<EmployeeTitles>>;
}
