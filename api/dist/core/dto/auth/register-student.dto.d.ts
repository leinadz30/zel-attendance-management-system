import { DefaultStudentUserDto } from "../students/students-base.dto";
export declare class RegisterStudentUserDto extends DefaultStudentUserDto {
    userName: string;
    password: string;
    schoolId: string;
}
