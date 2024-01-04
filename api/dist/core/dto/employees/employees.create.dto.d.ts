import { DefaultEmployeeUserDto } from "./employees-base.dto";
export declare class CreateEmployeeDto extends DefaultEmployeeUserDto {
    schoolId: string;
    createdByUserId: string;
}
export declare class CreateEmployeeUserDto extends DefaultEmployeeUserDto {
    userName: string;
    password: string;
    schoolId: string;
    createdByUserId: string;
    employeeRoleId: string;
}
