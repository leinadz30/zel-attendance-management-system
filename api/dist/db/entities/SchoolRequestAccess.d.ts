import { Users } from "./Users";
import { Schools } from "./Schools";
export declare class SchoolRequestAccess {
    schoolRequestAccessId: string;
    status: string;
    dateRequested: Date;
    updatedDate: Date | null;
    requestedByUser: Users;
    school: Schools;
    updatedByUser: Users;
}
