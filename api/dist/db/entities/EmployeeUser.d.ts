import { Employees } from "./Employees";
import { EmployeeUserAccess } from "./EmployeeUserAccess";
import { Users } from "./Users";
export declare class EmployeeUser {
    employeeId: string;
    userId: string;
    dateRegistered: Date;
    active: boolean;
    employee: Employees;
    employeeUserAccess: EmployeeUserAccess;
    user: Users;
}
