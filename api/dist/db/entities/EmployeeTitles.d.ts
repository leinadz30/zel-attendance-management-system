import { Users } from "./Users";
import { Schools } from "./Schools";
import { Employees } from "./Employees";
export declare class EmployeeTitles {
    employeeTitleId: string;
    employeeTitleCode: string | null;
    name: string;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    employees: Employees[];
}
