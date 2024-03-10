import { CreateLinkStudentRequestDto } from "src/core/dto/link-student-request/link-student-request.create.dto";
import { UpdateLinkStudentRequestDto } from "src/core/dto/link-student-request/link-student-request.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { LinkStudentRequest } from "src/db/entities/LinkStudentRequest";
import { LinkStudentRequestService } from "src/services/link-student-request.service";
export declare class LinkStudentRequestController {
    private readonly linkStudentRequestService;
    constructor(linkStudentRequestService: LinkStudentRequestService);
    getDetails(linkStudentRequestCode: string): Promise<ApiResponseModel<LinkStudentRequest>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: LinkStudentRequest[];
        total: number;
    }>>;
    create(linkStudentRequestDto: CreateLinkStudentRequestDto): Promise<ApiResponseModel<LinkStudentRequest>>;
    approve(linkStudentRequestCode: string, dto: UpdateLinkStudentRequestDto): Promise<ApiResponseModel<LinkStudentRequest>>;
    reject(linkStudentRequestCode: string, dto: UpdateLinkStudentRequestDto): Promise<ApiResponseModel<LinkStudentRequest>>;
    cancel(linkStudentRequestCode: string, dto: UpdateLinkStudentRequestDto): Promise<ApiResponseModel<LinkStudentRequest>>;
}
