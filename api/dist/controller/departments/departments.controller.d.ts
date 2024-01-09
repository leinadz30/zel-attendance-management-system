import { BatchCreateDepartmentDto, CreateDepartmentDto } from "src/core/dto/departments/departments.create.dto";
import { UpdateDepartmentDto } from "src/core/dto/departments/departments.update.dto";
import { PaginationParamsDto } from "src/core/dto/pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Departments } from "src/db/entities/Departments";
import { DepartmentsService } from "src/services/departments.service";
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    getDetails(departmentCode: string): Promise<ApiResponseModel<Departments>>;
    getPaginated(params: PaginationParamsDto): Promise<ApiResponseModel<{
        results: Departments[];
        total: number;
    }>>;
    create(departmentsDto: CreateDepartmentDto): Promise<ApiResponseModel<Departments>>;
    batchCreate(dtos: BatchCreateDepartmentDto[]): Promise<ApiResponseModel<{
        success: any[];
        failed: any[];
        duplicates: any[];
    }>>;
    update(departmentCode: string, dto: UpdateDepartmentDto): Promise<ApiResponseModel<Departments>>;
    delete(departmentCode: string): Promise<ApiResponseModel<Departments>>;
}
