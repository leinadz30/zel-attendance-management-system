import { Schools } from "./schools";
import { Users } from "./users";

export class EmployeeTitles {
  employeeTitleId: string;
  employeeTitleCode: string;
  name: string;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  createdByUser: Users;
  school: Schools;
  updatedByUser: Users;
}
