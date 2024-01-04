import { DefaultSchoolYearLevelDto } from "./school-year-levels-base.dto";
export declare class CreateSchoolYearLevelDto extends DefaultSchoolYearLevelDto {
    createdByUserId: string;
    schoolId: string;
}
