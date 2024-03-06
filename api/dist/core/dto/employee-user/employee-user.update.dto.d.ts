import { DefaultEmployeeUserDto } from "./employee-user-base.dto";
export declare class UpdateEmployeeUserDto extends DefaultEmployeeUserDto {
    updatedByUserId: string;
    employeeUserAccessId: string;
}
export declare class UpdateEmployeeUserProfileDto extends DefaultEmployeeUserDto {
}
