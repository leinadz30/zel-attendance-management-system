import { DefaultAnnouncementDto } from "./announcements-base.dto";
export declare class CreateAnnouncementDto extends DefaultAnnouncementDto {
    createdByUserId: string;
    schoolId: string;
    actions: "DRAFT" | "SEND";
}
