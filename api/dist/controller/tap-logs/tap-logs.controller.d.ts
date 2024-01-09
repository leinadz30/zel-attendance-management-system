import { CreateTapLogDto } from "src/core/dto/tap-logs/tap-logs.create.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { TapLogs } from "src/db/entities/TapLogs";
import { TapLogsService } from "src/services/tap-logs.service";
export declare class TapLogsController {
    private readonly tapLogsService;
    constructor(tapLogsService: TapLogsService);
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: TapLogs[];
        total: number;
    }>>;
    getDetails(tapLogId: string): Promise<ApiResponseModel<TapLogs>>;
    getStudentsTapsByParentCode(parentCode: string, date?: Date): Promise<ApiResponseModel<any>>;
    getStudentsTapsByStudentCode(studentCode: string, date?: Date): Promise<ApiResponseModel<any>>;
    create(tapLogsDto: CreateTapLogDto): Promise<ApiResponseModel<TapLogs>>;
    createBatch(tapLogsDtos: CreateTapLogDto[]): Promise<ApiResponseModel<{
        success: any[];
        failed: any[];
        duplicates: any[];
    }>>;
}
