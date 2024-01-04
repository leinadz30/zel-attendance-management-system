import { Employees } from "./employees";
import { Departments } from "./departments";
import { SchoolYearLevels } from "./school-year-levels";
import { Schools } from "./schools";
import { Users } from "./users";

export class Sections {
  sectionId: string;
  sectionCode: string;
  sectionName: string;
  adviserEmployee: Employees;
  department: Departments;
  schoolYearLevel: SchoolYearLevels;
  createdDate: Date;
  updatedDate: Date;
  active: boolean;
  createdByUser: Users;
  school: Schools;
  updatedByUser: Users;
}
