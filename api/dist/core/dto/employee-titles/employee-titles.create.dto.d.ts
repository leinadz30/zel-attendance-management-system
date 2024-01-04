import { DefaultEmployeeTitleDto } from "./employee-titles-base.dto";
export declare class CreateEmployeeTitleDto extends DefaultEmployeeTitleDto {
    createdByUserId: string;
    schoolId: string;
}
