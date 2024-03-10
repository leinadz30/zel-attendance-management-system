import { CreateAnnouncementDto } from "src/core/dto/announcements/announcements.create.dto";
import { UpdateAnnouncementDto } from "src/core/dto/announcements/announcements.update.dto";
import { AnnouncementRecipient } from "src/db/entities/AnnouncementRecipient";
import { Announcements } from "src/db/entities/Announcements";
import { Repository } from "typeorm";
export declare class AnnouncementsService {
    private readonly announcementsRepo;
    constructor(announcementsRepo: Repository<Announcements>);
    getAnnouncementsPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Announcements[];
        total: number;
    }>;
    getByCode(announcementCode: any): Promise<Announcements>;
    create(dto: CreateAnnouncementDto): Promise<Announcements>;
    update(announcementCode: any, dto: UpdateAnnouncementDto): Promise<Announcements>;
    cancel(announcementCode: any): Promise<Announcements>;
    delete(announcementCode: any): Promise<Announcements>;
    createAnnouncementRecipients(dto: CreateAnnouncementDto | UpdateAnnouncementDto, announcements: Announcements): AnnouncementRecipient[];
}
