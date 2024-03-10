import { Employees } from "./employees";
import { EmployeeRoles } from "./employee-roles";
import { Schools } from "./schools";
import { Users } from "./users";

export class EmployeeUser {
  employee: Employees;
  department: Users;
  employeeRole: EmployeeRoles;
}
