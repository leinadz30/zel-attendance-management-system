import { EmployeeUser } from "./EmployeeUser";
import { Users } from "./Users";
import { Departments } from "./Departments";
import { EmployeeTitles } from "./EmployeeTitles";
import { Schools } from "./Schools";
import { Sections } from "./Sections";
export declare class Employees {
    employeeId: string;
    employeeCode: string | null;
    fullName: string;
    createdDate: Date;
    updatedDate: Date | null;
    schoolId: string;
    active: boolean;
    accessGranted: boolean;
    mobileNumber: string | null;
    cardNumber: string | null;
    orgEmployeeId: string | null;
    employeeUser: EmployeeUser;
    createdByUser: Users;
    department: Departments;
    employeePosition: EmployeeTitles;
    school: Schools;
    updatedByUser: Users;
    sections: Sections[];
}
