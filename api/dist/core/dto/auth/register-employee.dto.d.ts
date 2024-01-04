import { DefaultEmployeeUserDto } from "../employees/employees-base.dto";
export declare class RegisterEmployeeUserDto extends DefaultEmployeeUserDto {
    userName: string;
    password: string;
    schoolId: string;
}
