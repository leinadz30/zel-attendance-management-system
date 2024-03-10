import { DefaultEmployeeTitleDto } from "./employee-titles-base.dto";
export declare class CreateEmployeeTitleDto extends DefaultEmployeeTitleDto {
    createdByUserId: string;
    schoolId: string;
}
export declare class BatchCreateEmployeeTitleDto extends DefaultEmployeeTitleDto {
    createdByUserId: string;
    orgSchoolCode: string;
    refId: string;
}
