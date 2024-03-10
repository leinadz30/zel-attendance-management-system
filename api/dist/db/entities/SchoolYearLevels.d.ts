import { Users } from "./Users";
import { Schools } from "./Schools";
import { Sections } from "./Sections";
import { Students } from "./Students";
export declare class SchoolYearLevels {
    schoolYearLevelId: string;
    schoolYearLevelCode: string | null;
    schoolId: string;
    name: string | null;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    educationalStage: string;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    sections: Sections[];
    students: Students[];
}
