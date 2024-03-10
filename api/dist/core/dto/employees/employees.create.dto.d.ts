import { DefaultEmployeeDto } from "./employees-base.dto";
export declare class CreateEmployeeDto extends DefaultEmployeeDto {
    schoolId: string;
    createdByUserId: string;
}
