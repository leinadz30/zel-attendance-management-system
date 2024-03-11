export declare class StudentRecipientDto {
    sectionId: string;
    excludedStudentIds: string[];
}
export declare class EmployeeRecipientDto {
    employeeTitleId: string;
    excludedEmployeeIds: string[];
}
export declare class DefaultAnnouncementDto {
    title: string;
    description: string;
    targetDate: Date;
    targetTime: string;
    isSchedule: boolean;
    basicEdStudentRecipients: StudentRecipientDto[];
    higherEdStudenttudentRecipients: StudentRecipientDto[];
    employeeRecipients: EmployeeRecipientDto[];
}
