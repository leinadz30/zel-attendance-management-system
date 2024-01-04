import { Courses } from "./courses";
import { Students } from "./students";

export class StudentCourse {
  studentId: string;
  courseId: string;
  student: Students;
  course: Courses;
  enrolledDate: string;
}
