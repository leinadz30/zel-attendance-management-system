import { Users } from "./Users";
import { Schools } from "./Schools";
import { StudentStrand } from "./StudentStrand";
export declare class Strands {
    strandId: string;
    strandCode: string | null;
    schoolId: string;
    name: string;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    studentStrands: StudentStrand[];
}
