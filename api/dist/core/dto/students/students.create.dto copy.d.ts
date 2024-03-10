import { DefaultStudentUserDto } from "./students-base.dto";
export declare class CreateStudentDto extends DefaultStudentUserDto {
    schoolId: string;
    registeredByUserId: string;
}
export declare class CreateStudentUserDto extends DefaultStudentUserDto {
    userName: string;
    password: string;
    schoolId: string;
    registeredByUserId: string;
}
