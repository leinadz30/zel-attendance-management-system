import { DefaultDepartmentDto } from "./announcements-base.dto";
export declare class CreateDepartmentDto extends DefaultDepartmentDto {
    createdByUserId: string;
    schoolId: string;
}
