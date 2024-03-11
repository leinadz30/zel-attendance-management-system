import { CreateAppReleaseDto } from "src/core/dto/app-release/app-release.create.dto";
import { UpdateAppReleaseDto } from "src/core/dto/app-release/app-release.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { AppRelease } from "src/db/entities/AppRelease";
import { AppReleaseService } from "src/services/app-release.service";
export declare class AppReleaseController {
    private readonly appReleasesService;
    constructor(appReleasesService: AppReleaseService);
    getDetails(id: string): Promise<ApiResponseModel<AppRelease>>;
    getLatestVersion(appTypeCode: string): Promise<ApiResponseModel<AppRelease>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: AppRelease[];
        total: number;
    }>>;
    create(dto: CreateAppReleaseDto): Promise<ApiResponseModel<AppRelease>>;
    update(id: string, dto: UpdateAppReleaseDto): Promise<ApiResponseModel<AppRelease>>;
    delete(id: string): Promise<ApiResponseModel<AppRelease>>;
}
