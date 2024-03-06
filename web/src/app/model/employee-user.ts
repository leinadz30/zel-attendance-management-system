import { Employees } from "./employees";
import { EmployeeUserAccess } from "./employee-user-access";
import { Schools } from "./schools";
import { Users } from "./users";

export class EmployeeUser {
  employee: Employees;
  user: Users;
  employeeUserAccess: EmployeeUserAccess;
}
