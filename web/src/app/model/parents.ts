import { ParentStudent } from "./parent-students";
import { Users } from "./users";

export class Parents {
  parentId: string;
  parentCode: string;
  fullName: string;
  mobileNumber: string;
  registrationDate: Date;
  updatedDate: Date;
  parentStudents: ParentStudent;
  registeredByUser: Users;
  updatedByUser: Users;
  active: boolean;
  accessGranted: boolean;
  user: Users;
}
