import { CreateCourseDto } from "src/core/dto/courses/courses.create.dto";
import { UpdateCourseDto } from "src/core/dto/courses/courses.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Courses } from "src/db/entities/Courses";
import { CoursesService } from "src/services/courses.service";
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    getDetails(courseCode: string): Promise<ApiResponseModel<Courses>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Courses[];
        total: number;
    }>>;
    create(coursesDto: CreateCourseDto): Promise<ApiResponseModel<Courses>>;
    update(courseCode: string, dto: UpdateCourseDto): Promise<ApiResponseModel<Courses>>;
    delete(courseCode: string): Promise<ApiResponseModel<Courses>>;
}
