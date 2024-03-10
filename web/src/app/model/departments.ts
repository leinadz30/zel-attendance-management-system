import { Schools } from "./schools";
import { Users } from "./users";

export class Departments {
  departmentId: string;
  departmentCode: string;
  departmentName: string;
  type: 'STUDENT' | 'EMPLOYEE';
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  createdByUser: Users;
  school: Schools;
  updatedByUser: Users;
}
