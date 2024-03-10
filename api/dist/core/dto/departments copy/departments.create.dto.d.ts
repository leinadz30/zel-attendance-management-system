import { DefaultDepartmentDto } from "./departments-base.dto";
export declare class CreateDepartmentDto extends DefaultDepartmentDto {
    createdByUserId: string;
    schoolId: string;
}
