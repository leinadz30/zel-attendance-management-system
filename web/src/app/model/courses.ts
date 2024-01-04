import { Schools } from "./schools";
import { Users } from "./users";

export class Courses {
  courseId: string;
  courseCode: string;
  name: string;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  createdByUser: Users;
  school: Schools;
  updatedByUser: Users;
}
