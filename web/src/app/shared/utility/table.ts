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
  accessGranted?: boolean;
}

export class OpsSchoolsTableColumn {
  schoolCode?: string;
  orgSchoolCode?: string;
  schoolName?: string;
  schoolAddress?: string;
  schoolEmail?: string;
  schoolContactNumber?: string;
  url?: string;
}

export class OpsDepartmentsTableColumn {
  departmentCode: string;
  departmentName: string;
  url?: string;
}

export class OpsCoursesTableColumn {
  courseCode: string;
  name: string;
  url?: string;
}

export class OpsStrandsTableColumn {
  strandCode: string;
  name: string;
  url?: string;
}

export class OpsEmployeeTitlesTableColumn {
  employeeTitleCode: string;
  name: string;
  url?: string;
}

export class OpsSchoolYearLevelsTableColumn {
  schoolYearLevelCode: string;
  name: string;
  educationalStage?: string;
  url?: string;
}

export class OpsSectionsTableColumn {
  sectionCode: string;
  sectionName: string;
  schoolYearLevel?: string;
  department?: string;
  adviserEmployee?: string;
  url?: string;
}

export class OpsEmployeesTableColumn {
  employeeCode?: string;
  fullName?: string;
  mobileNumber?: string;
  cardNumber?: string;
  department?: string;
}

export class OpsParentsTableColumn {
  parentCode?: string;
  fullName?: string;
  mobileNumber?: string;
}

export class OpsStudentsTableColumn {
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

export class OpsLinkStudentRequestTableColumn extends TableColumnBase {
  linkStudentRequestCode?: string;
  dateRequested?: string;
  status?: string;
  student?: string;
  studentCode?: string;
  requestedByParent?: string;
  requestedByParentCode?: string;
}

export class OpsMachinesTableColumn {
  machineCode: string;
  description: string;
  url?: string;
}
