import { Departments } from "./departments";
import { EmployeeTitles } from "./employee-titles";
import { EmployeeUser } from "./employee-user";
import { Schools } from "./schools";
import { Users } from "./users";

export class Employees {
  employeeId: string;
  employeeCode: string;
  orgEmployeeId: string;
  fullName: string;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  accessGranted: boolean;
  mobileNumber: string;
  cardNumber: string;
  employeeUser: EmployeeUser;
  employeePosition: EmployeeTitles;
  createdByUser: Users;
  department: Departments;
  school: Schools;
}
