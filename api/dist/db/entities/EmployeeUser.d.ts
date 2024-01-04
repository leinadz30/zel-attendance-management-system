import { Employees } from "./Employees";
import { EmployeeRoles } from "./EmployeeRoles";
import { Users } from "./Users";
export declare class EmployeeUser {
    employeeId: string;
    userId: string;
    dateRegistered: Date;
    employee: Employees;
    employeeRole: EmployeeRoles;
    user: Users;
}
