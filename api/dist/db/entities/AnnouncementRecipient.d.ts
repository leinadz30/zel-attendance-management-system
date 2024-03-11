import { Announcements } from "./Announcements";
export declare class AnnouncementRecipient {
    announcementId: string;
    type: string;
    groupReferenceId: string;
    excludedIds: string[] | null;
    announcement: Announcements;
}
