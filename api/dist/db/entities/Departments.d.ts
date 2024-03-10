import { Users } from "./Users";
import { Schools } from "./Schools";
import { Employees } from "./Employees";
import { Sections } from "./Sections";
import { Students } from "./Students";
export declare class Departments {
    departmentId: string;
    departmentCode: string | null;
    schoolId: string;
    departmentName: string;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    employees: Employees[];
    sections: Sections[];
    students: Students[];
}
