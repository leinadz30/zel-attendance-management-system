import { CreateEmployeeTitleDto } from "src/core/dto/employee-titles/employee-titles.create.dto";
import { UpdateEmployeeTitleDto } from "src/core/dto/employee-titles/employee-titles.update.dto";
import { EmployeeTitles } from "src/db/entities/EmployeeTitles";
import { Repository } from "typeorm";
export declare class EmployeeTitlesService {
    private readonly employeeTitlesRepo;
    constructor(employeeTitlesRepo: Repository<EmployeeTitles>);
    getEmployeeTitlesPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: EmployeeTitles[];
        total: number;
    }>;
    getByCode(employeeTitleCode: any): Promise<EmployeeTitles>;
    create(dto: CreateEmployeeTitleDto): Promise<EmployeeTitles>;
    batchCreate(dtos: CreateEmployeeTitleDto[]): Promise<any[]>;
    update(employeeTitleCode: any, dto: UpdateEmployeeTitleDto): Promise<EmployeeTitles>;
    delete(employeeTitleCode: any): Promise<EmployeeTitles>;
}
