import { DefaultEmployeeUserDto } from "./employees-base.dto";
export declare class UpdateEmployeeDto extends DefaultEmployeeUserDto {
    updatedByUserId: string;
}
export declare class UpdateEmployeeUserDto extends DefaultEmployeeUserDto {
    updatedByUserId: string;
    employeeRoleId: string;
}
export declare class UpdateEmployeeUserProfileDto extends DefaultEmployeeUserDto {
}
