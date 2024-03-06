import { Schools } from "./schools";
import { Users } from "./users";

export class EmployeeUserAccess {
  employeeUserAccessId: string;
  employeeUserAccessCode: string;
  name: string;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  createdByUser: Users;
  school: Schools;
  updatedByUser: Users;
  accessPages?: AccessPages[];
}

export class AccessPages {
  page?: string;
  view?: boolean;
  modify?: boolean;
  rights?: string[] = [];
}
