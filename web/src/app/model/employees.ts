import { Departments } from "./departments";
import { EmployeeTitles } from "./employee-titles";
import { EmployeeUser } from "./employees-user";
import { Schools } from "./schools";
import { Users } from "./users";

export class Employees {
  employeeId: string;
  employeeCode: string;
  orgEmployeeId: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
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
