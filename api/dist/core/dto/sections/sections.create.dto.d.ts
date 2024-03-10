import { DefaultSectionDto } from "./sections-base.dto";
export declare class CreateSectionDto extends DefaultSectionDto {
    createdByUserId: string;
    schoolId: string;
}
export declare class BatchCreateSectionDto {
    sectionName: string;
    adviserOrgEmployeeId: string;
    departmentName: string;
    schoolYearLevelName: string;
    createdByUserId: string;
    orgSchoolCode: string;
    refId: string;
}
