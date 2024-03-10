import { CreateStrandDto } from "src/core/dto/strands/strands.create.dto";
import { UpdateStrandDto } from "src/core/dto/strands/strands.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Strands } from "src/db/entities/Strands";
import { StrandsService } from "src/services/strands.service";
export declare class StrandsController {
    private readonly strandsService;
    constructor(strandsService: StrandsService);
    getDetails(strandCode: string): Promise<ApiResponseModel<Strands>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Strands[];
        total: number;
    }>>;
    create(strandsDto: CreateStrandDto): Promise<ApiResponseModel<Strands>>;
    update(strandCode: string, dto: UpdateStrandDto): Promise<ApiResponseModel<Strands>>;
    delete(strandCode: string): Promise<ApiResponseModel<Strands>>;
}
