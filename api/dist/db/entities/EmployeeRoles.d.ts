import { Users } from "./Users";
import { Schools } from "./Schools";
import { EmployeeUser } from "./EmployeeUser";
export declare class EmployeeUserRoles {
    employeeRoleId: string;
    employeeRoleCode: string | null;
    name: string;
    employeeRoleAccess: object;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    employeeUsers: EmployeeUser[];
}
