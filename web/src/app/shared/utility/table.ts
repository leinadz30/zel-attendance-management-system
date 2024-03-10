export class ColumnDefinition {
  name: string;
  label: string;
  apiNotation?: string;
  sticky?: boolean;
  style?: ColumnStyle;
  controls?: boolean;
  format?: {
    type: "currency" | "date" | "date-time" | "number" | "custom";
    custom: string;
  };
  hide?: boolean;
  type?: "string" | "boolean" | "date" | "number" = "string";
  filterOptions: ColumnDefinitionFilterOptions;
  urlPropertyName?: string;
  filter: any;
}

export class ColumnDefinitionFilterOptions {
  placeholder?: string;
  enable?: boolean;
  type?: "text" | "option" | "option-yes-no" | "date" | "date-range" | "number" | "number-range" | "precise";
};
export class ColumnStyle {
  width: string;
  left: string;
}

export class TableColumnBase {
  menu: any[] = [];
}

export class OpsUsersTableColumn {
  operatorCode?: string;
  name?: string;
  userName?: string;
}

export class CommonSchoolsTableColumn {
  schoolCode?: string;
  orgSchoolCode?: string;
  schoolName?: string;
  schoolAddress?: string;
  schoolEmail?: string;
  schoolContactNumber?: string;
  url?: string;
}

export class CommonDepartmentsTableColumn {
  departmentCode: string;
  departmentName?: string;
  type?: string;
  url?: string;
}

export class CommonCoursesTableColumn {
  courseCode: string;
  name: string;
  url?: string;
}

export class CommonStrandsTableColumn {
  strandCode: string;
  name: string;
  url?: string;
}

export class CommonEmployeeTitlesTableColumn {
  employeeTitleCode: string;
  name: string;
  url?: string;
}

export class CommonEmployeeUserAccessTableColumn {
  employeeUserAccessCode: string;
  employeeUserAccessId?: string;
  name: string;
  url?: string;
}

export class CommonSchoolYearLevelsTableColumn {
  schoolYearLevelCode: string;
  name: string;
  educationalStage?: string;
  url?: string;
}

export class CommonSectionsTableColumn {
  sectionCode: string;
  sectionName: string;
  schoolYearLevel?: string;
  department?: string;
  adviserEmployee?: string;
  url?: string;
}

export class CommonEmployeesTableColumn {
  employeeCode?: string;
  orgEmployeeId?: string;
  fullName?: string;
  mobileNumber?: string;
  cardNumber?: string;
  department?: string;
}

export class CommonEmployeeUserTableColumn {
  employeeCode?: string;
  orgEmployeeId?: string;
  userName?: string;
  accessGranted?: boolean;
  fullName?: string;
  mobileNumber?: string;
  employeeUserAccess?: string;
  url?: string;
}

export class CommonParentsTableColumn {
  parentCode?: string;
  fullName?: string;
  mobileNumber?: string;
}

export class CommonStudentsTableColumn {
  studentCode?: string;
  fullName?: string;
  orgStudentId?: string;
  cardNumber?: string;
  mobileNumber?: string;
  schoolYearLevel?: string;
  studentCourse?: string;
  studentStrand?: string;
  studentSection?: string;
  department?: string;
}

export class CommonLinkStudentRequestTableColumn extends TableColumnBase {
  linkStudentRequestCode?: string;
  dateRequested?: string;
  status?: string;
  student?: string;
  studentCode?: string;
  requestedByParent?: string;
  requestedByParentCode?: string;
}

export class CommonMachinesTableColumn {
  machineCode: string;
  description: string;
  url?: string;
}
