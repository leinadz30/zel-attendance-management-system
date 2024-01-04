import { ParentStudent } from "./parent-students";
import { Users } from "./users";

export class Parents {
  parentId: string;
  parentCode: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  fullName: string;
  gender: string;
  birthDate: string;
  mobileNumber: string;
  email: string;
  address: string;
  registrationDate: Date;
  updatedDate: Date;
  parentStudents: ParentStudent;
  registeredByUser: Users;
  updatedByUser: Users;
  active: boolean;
  accessGranted: boolean;
  user: Users;
}
