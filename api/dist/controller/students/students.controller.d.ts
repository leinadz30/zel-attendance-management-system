import { CreateStudentDto } from "src/core/dto/students/students.create.dto";
import { UpdateStudentDto } from "src/core/dto/students/students.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Students } from "src/db/entities/Students";
import { StudentsService } from "src/services/students.service";
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    getDetails(studentCode: string): Promise<ApiResponseModel<Students>>;
    getByOrgStudentId(orgStudentId: string): Promise<ApiResponseModel<Students>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Students[];
        total: number;
    }>>;
    create(studentsDto: CreateStudentDto): Promise<ApiResponseModel<Students>>;
    update(studentCode: string, dto: UpdateStudentDto): Promise<ApiResponseModel<Students>>;
    approveAccessRequest(studentCode: string): Promise<ApiResponseModel<Students>>;
    delete(studentCode: string): Promise<ApiResponseModel<Students>>;
}
