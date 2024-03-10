import { CreateCourseDto } from "src/core/dto/courses/courses.create.dto";
import { UpdateCourseDto } from "src/core/dto/courses/courses.update.dto";
import { Courses } from "src/db/entities/Courses";
import { Repository } from "typeorm";
export declare class CoursesService {
    private readonly coursesRepo;
    constructor(coursesRepo: Repository<Courses>);
    getCoursesPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Courses[];
        total: number;
    }>;
    getByCode(courseCode: any): Promise<Courses>;
    create(dto: CreateCourseDto): Promise<Courses>;
    update(courseCode: any, dto: UpdateCourseDto): Promise<Courses>;
    delete(courseCode: any): Promise<Courses>;
}
