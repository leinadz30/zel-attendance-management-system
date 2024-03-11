import { AnnouncementRecipient } from "./AnnouncementRecipient";
import { Users } from "./Users";
import { Schools } from "./Schools";
export declare class Announcements {
    announcementId: string;
    announcementCode: string | null;
    status: string | null;
    title: string;
    description: string;
    isSchedule: boolean;
    targetDate: string;
    targetTime: string;
    dateSent: Date;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    announcementRecipients: AnnouncementRecipient[];
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
}
