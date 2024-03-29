import { Announcements } from "./Announcements";
import { Courses } from "./Courses";
import { Departments } from "./Departments";
import { EmployeeTitles } from "./EmployeeTitles";
import { EmployeeUserAccess } from "./EmployeeUserAccess";
import { Employees } from "./Employees";
import { LinkStudentRequest } from "./LinkStudentRequest";
import { Machines } from "./Machines";
import { SchoolRequestAccess } from "./SchoolRequestAccess";
import { SchoolYearLevels } from "./SchoolYearLevels";
import { Users } from "./Users";
import { Sections } from "./Sections";
import { Strands } from "./Strands";
import { Students } from "./Students";
export declare class Schools {
    schoolId: string;
    schoolCode: string | null;
    schoolName: string;
    studentsAllowableTimeLate: string | null;
    studentsTimeLate: string | null;
    restrictGuardianTime: boolean | null;
    employeesTimeBeforeSwipeIsAllowed: string | null;
    employeesAllowableTimeLate: string | null;
    employeesTimeLate: string | null;
    timeBeforeSwipeIsAllowed: string | null;
    smsNotificationForStaffEntry: string | null;
    smsNotificationForStudentBreakTime: string | null;
    schoolContactNumber: string | null;
    schoolAddress: string | null;
    schoolEmail: string | null;
    dateRegistered: Date;
    dateUpdated: Date | null;
    active: boolean;
    orgSchoolCode: string;
    announcements: Announcements[];
    courses: Courses[];
    departments: Departments[];
    employeeTitles: EmployeeTitles[];
    employeeUserAccesses: EmployeeUserAccess[];
    employees: Employees[];
    linkStudentRequests: LinkStudentRequest[];
    machines: Machines[];
    schoolRequestAccesses: SchoolRequestAccess[];
    schoolYearLevels: SchoolYearLevels[];
    registeredByUser: Users;
    updatedByUser: Users;
    sections: Sections[];
    strands: Strands[];
    students: Students[];
}
