import { Sections } from "./sections";
import { Students } from "./students";

export class StudentSection {
  studentId: string;
  courseId: string;
  student: Students;
  section: Sections;
  dateAdded: string;
}
