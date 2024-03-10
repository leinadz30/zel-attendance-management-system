import { Users } from "./Users";
import { Schools } from "./Schools";
export declare class Announcements {
    announcementId: string;
    announcementCode: string | null;
    title: string;
    description: string;
    targetDate: Date;
    targetType: string;
    targetIds: string[];
    scheduled: boolean;
    createdDate: Date;
    updatedDate: Date | null;
    draft: boolean;
    sent: boolean;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
}
