import { BatchCreateSchoolYearLevelDto, CreateSchoolYearLevelDto } from "src/core/dto/school-year-levels/school-year-levels.create.dto";
import { UpdateSchoolYearLevelDto } from "src/core/dto/school-year-levels/school-year-levels.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { SchoolYearLevels } from "src/db/entities/SchoolYearLevels";
import { SchoolYearLevelsService } from "src/services/school-year-levels.service";
export declare class SchoolYearLevelsController {
    private readonly schoolYearLevelsService;
    constructor(schoolYearLevelsService: SchoolYearLevelsService);
    getDetails(schoolYearLevelCode: string): Promise<ApiResponseModel<SchoolYearLevels>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: SchoolYearLevels[];
        total: number;
    }>>;
    create(schoolYearLevelsDto: CreateSchoolYearLevelDto): Promise<ApiResponseModel<SchoolYearLevels>>;
    batchCreate(dtos: BatchCreateSchoolYearLevelDto[]): Promise<ApiResponseModel<{
        success: any[];
        failed: any[];
        warning: any[];
    }>>;
    update(schoolYearLevelCode: string, dto: UpdateSchoolYearLevelDto): Promise<ApiResponseModel<SchoolYearLevels>>;
    delete(schoolYearLevelCode: string): Promise<ApiResponseModel<SchoolYearLevels>>;
}
