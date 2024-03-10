import { DefaultDepartmentDto } from "./departments-base.dto";
export declare class CreateDepartmentDto extends DefaultDepartmentDto {
    createdByUserId: string;
    schoolId: string;
}
export declare class BatchCreateDepartmentDto extends DefaultDepartmentDto {
    createdByUserId: string;
    orgSchoolCode: string;
    refId: string;
}
