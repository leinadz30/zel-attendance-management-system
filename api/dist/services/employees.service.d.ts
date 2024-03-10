import { BatchCreateEmployeeDto } from "src/core/dto/employees/employees.batch-create.dto";
import { CreateEmployeeDto } from "src/core/dto/employees/employees.create.dto";
import { UpdateEmployeeDto } from "src/core/dto/employees/employees.update.dto";
import { Employees } from "src/db/entities/Employees";
import { Repository } from "typeorm";
export declare class EmployeesService {
    private readonly employeeRepo;
    constructor(employeeRepo: Repository<Employees>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Employees[];
        total: number;
    }>;
    getByCode(employeeCode: any): Promise<Employees>;
    create(dto: CreateEmployeeDto): Promise<Employees>;
    createBatch(dtos: BatchCreateEmployeeDto[]): Promise<{
        success: any[];
        warning: any[];
        failed: any[];
    }>;
    update(employeeCode: any, dto: UpdateEmployeeDto): Promise<Employees>;
    delete(employeeCode: any): Promise<Employees>;
}
