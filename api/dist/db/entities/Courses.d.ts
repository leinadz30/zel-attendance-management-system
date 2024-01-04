import { Users } from "./Users";
import { Schools } from "./Schools";
import { StudentCourse } from "./StudentCourse";
export declare class Courses {
    courseId: string;
    courseCode: string | null;
    schoolId: string;
    name: string;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    createdByUser: Users;
    school: Schools;
    updatedByUser: Users;
    studentCourses: StudentCourse[];
}
