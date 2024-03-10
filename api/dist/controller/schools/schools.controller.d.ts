import { CreateSchoolDto } from "src/core/dto/schools/schools.create.dto";
import { UpdateSchoolDto } from "src/core/dto/schools/schools.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Schools } from "src/db/entities/Schools";
import { SchoolsService } from "src/services/schools.service";
export declare class SchoolsController {
    private readonly schoolsService;
    constructor(schoolsService: SchoolsService);
    getDetails(schoolCode: string): Promise<ApiResponseModel<Schools>>;
    getByOrgCode(orgSchoolCode: string): Promise<ApiResponseModel<Schools>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Schools[];
        total: number;
    }>>;
    create(schoolsDto: CreateSchoolDto): Promise<ApiResponseModel<Schools>>;
    batchCreate(schoolsDtos: CreateSchoolDto[]): Promise<ApiResponseModel<Schools[]>>;
    update(schoolCode: string, dto: UpdateSchoolDto): Promise<ApiResponseModel<Schools>>;
    delete(schoolCode: string): Promise<ApiResponseModel<Schools>>;
}
