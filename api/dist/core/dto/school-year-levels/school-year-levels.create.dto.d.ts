import { DefaultSchoolYearLevelDto } from "./school-year-levels-base.dto";
export declare class CreateSchoolYearLevelDto extends DefaultSchoolYearLevelDto {
    createdByUserId: string;
    schoolId: string;
}
export declare class BatchCreateSchoolYearLevelDto extends DefaultSchoolYearLevelDto {
    createdByUserId: string;
    orgSchoolCode: string;
    refId: string;
}
