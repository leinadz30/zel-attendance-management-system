import { CreateAnnouncementDto } from "src/core/dto/announcements/announcements.create.dto";
import { UpdateAnnouncementDto } from "src/core/dto/announcements/announcements.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Announcements } from "src/db/entities/Announcements";
import { AnnouncementsService } from "src/services/announcements.service";
export declare class AnnouncementsController {
    private readonly announcementsService;
    constructor(announcementsService: AnnouncementsService);
    getDetails(announcementCode: string): Promise<ApiResponseModel<Announcements>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Announcements[];
        total: number;
    }>>;
    create(announcementsDto: CreateAnnouncementDto): Promise<ApiResponseModel<Announcements>>;
    update(announcementCode: string, dto: UpdateAnnouncementDto): Promise<ApiResponseModel<Announcements>>;
    cancel(announcementCode: string): Promise<ApiResponseModel<Announcements>>;
    delete(announcementCode: string): Promise<ApiResponseModel<Announcements>>;
}
