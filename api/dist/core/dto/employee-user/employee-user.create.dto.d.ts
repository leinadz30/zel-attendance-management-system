import { DefaultEmployeeUserDto } from "./employee-user-base.dto";
export declare class CreateEmployeeUserDto extends DefaultEmployeeUserDto {
    userName: string;
    password: string;
    schoolCode: string;
    createdByUserId: string;
    employeeUserAccessId: string;
}
export declare class CreateEmployeeUserFromEmployeeDto {
    employeeId: string;
    userName: string;
    password: string;
    createdByUserId: string;
    employeeUserAccessId: string;
}
