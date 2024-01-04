import { ColumnDefinition } from "./table"

export interface AppConfig {
    appName: string;
    reservationConfig: {
      maxCancellation: string;
      daysCancellationLimitReset: string;
      timeSlotHours: {
        start: string;
        end: string;
      };
      timeSlotNotAvailableHours: string[];
      dayOfWeekNotAvailable: string[];
    };
    tableColumns: {
      employees: ColumnDefinition[];
      parents: ColumnDefinition[];
      students: ColumnDefinition[];
      operators: ColumnDefinition[];
      schools: ColumnDefinition[];
      departments: ColumnDefinition[];
      schoolYearLevels: ColumnDefinition[];
      sections: ColumnDefinition[];
      employeeTitles: ColumnDefinition[];
      courses: ColumnDefinition[];
      strands: ColumnDefinition[];
      linkStudentRequest: ColumnDefinition[];
      machines: ColumnDefinition[];
    };
    sessionConfig: {
      sessionTimeout: string;
    };
    lookup: {
      access: {
        page: string;
        view: boolean;
        modify: boolean;
        rights: string[];
      }[];
    };
    apiEndPoints: {
      auth: {
        loginOperator: string;
        loginEmployeeUser: string;
      };
      operators: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        resetPassword: string;
        approveAccessRequest: string;
        delete: string;
      };
      schools: {
        getByAdvanceSearch: string;
        getByCode: string;
        getByOrgCode: string;
        create: string;
        update: string;
        delete: string;
      };
      departments: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      schoolYearLevels: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      sections: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      employees: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      students: {
        getByAdvanceSearch: string;
        getByCode: string;
        getByOrgStudentId: string;
        create: string;
        update: string;
        delete: string;
      },
      employeeTitles: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      courses: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      strands: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      parents: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      },
      linkStudentRequest: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        approve: string;
        reject: string;
        cancel: string;
      },
      machines: {
        getByAdvanceSearch: string;
        getByCode: string;
        create: string;
        update: string;
        delete: string;
      }
    };
  }
