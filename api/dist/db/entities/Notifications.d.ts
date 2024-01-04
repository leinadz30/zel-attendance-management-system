import { Users } from "./Users";
export declare class Notifications {
    notificationId: string;
    type: string;
    title: string;
    description: string;
    dateTime: Date;
    isRead: boolean;
    active: boolean;
    referenceId: string;
    forUser: Users;
}
