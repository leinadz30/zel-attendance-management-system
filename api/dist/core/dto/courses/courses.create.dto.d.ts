import { DefaultCourseDto } from "./courses-base.dto";
export declare class CreateCourseDto extends DefaultCourseDto {
    createdByUserId: string;
    schoolId: string;
}
