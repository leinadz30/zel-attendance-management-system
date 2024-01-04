import { Parents } from "./parents";
import { Schools } from "./schools";
import { Students } from "./students";
import { Users } from "./users";

export class LinkStudentRequest {
  linkStudentRequestId: string;
  linkStudentRequestCode: string;
  status: string;
  dateRequested: Date;
  updatedDate: Date;
  notes: string;
  requestedByParent: Parents;
  school: Schools;
  student: Students;
  updatedByUser: Users;
}
