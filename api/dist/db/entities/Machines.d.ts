import { Users } from "./Users";
import { Schools } from "./Schools";
import { TapLogs } from "./TapLogs";
export declare class Machines {
    machineId: string;
    machineCode: string | null;
    schoolId: string;
    description: string;
    path: string | null;
    domain: string | null;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    tapLogs: TapLogs[];
}
