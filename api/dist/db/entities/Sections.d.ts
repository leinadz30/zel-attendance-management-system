import { Employees } from "./Employees";
import { Users } from "./Users";
import { Departments } from "./Departments";
import { Schools } from "./Schools";
import { SchoolYearLevels } from "./SchoolYearLevels";
import { StudentSection } from "./StudentSection";
export declare class Sections {
    sectionId: string;
    sectionCode: string | null;
    sectionName: string;
    createdDate: Date;
    updatedDate: Date | null;
    active: boolean;
    adviserEmployee: Employees;
    createdByUser: Users;
    department: Departments;
    school: Schools;
    schoolYearLevel: SchoolYearLevels;
    updatedByUser: Users;
    studentSections: StudentSection[];
}
