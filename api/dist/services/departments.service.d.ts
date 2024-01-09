import { BatchCreateDepartmentDto, CreateDepartmentDto } from "src/core/dto/departments/departments.create.dto";
import { UpdateDepartmentDto } from "src/core/dto/departments/departments.update.dto";
import { Departments } from "src/db/entities/Departments";
import { Repository } from "typeorm";
export declare class DepartmentsService {
    private readonly departmentsRepo;
    constructor(departmentsRepo: Repository<Departments>);
    getDepartmentsPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Departments[];
        total: number;
    }>;
    getByCode(departmentCode: any): Promise<Departments>;
    create(dto: CreateDepartmentDto): Promise<Departments>;
    batchCreate(dtos: BatchCreateDepartmentDto[]): Promise<{
        success: any[];
        duplicates: any[];
        failed: any[];
    }>;
    update(departmentCode: any, dto: UpdateDepartmentDto): Promise<Departments>;
    delete(departmentCode: any): Promise<Departments>;
}
