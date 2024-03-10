import { EmployeeUser } from "./EmployeeUser";
import { Users } from "./Users";
import { Schools } from "./Schools";
export declare class EmployeeUserRole {
    employeeUserRoleId: string;
    employeeUserRoleCode: string | null;
    name: string;
    accessPages: object;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    employeeUsers: EmployeeUser[];
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
}
