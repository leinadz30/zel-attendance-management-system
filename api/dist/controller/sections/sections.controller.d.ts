import { CreateSectionDto } from "src/core/dto/sections/sections.create.dto";
import { UpdateSectionDto } from "src/core/dto/sections/sections.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Sections } from "src/db/entities/Sections";
import { SectionsService } from "src/services/sections.service";
export declare class SectionsController {
    private readonly sectionsService;
    constructor(sectionsService: SectionsService);
    getDetails(sectionCode: string): Promise<ApiResponseModel<Sections>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Sections[];
        total: number;
    }>>;
    create(sectionsDto: CreateSectionDto): Promise<ApiResponseModel<Sections>>;
    update(sectionCode: string, dto: UpdateSectionDto): Promise<ApiResponseModel<Sections>>;
    delete(sectionCode: string): Promise<ApiResponseModel<Sections>>;
}
