import { Parents } from "./Parents";
import { Schools } from "./Schools";
import { Students } from "./Students";
import { Users } from "./Users";
export declare class LinkStudentRequest {
    linkStudentRequestId: string;
    status: string;
    dateRequested: Date;
    updatedDate: Date | null;
    notes: string | null;
    linkStudentRequestCode: string | null;
    requestedByParent: Parents;
    school: Schools;
    student: Students;
    updatedByUser: Users;
}
