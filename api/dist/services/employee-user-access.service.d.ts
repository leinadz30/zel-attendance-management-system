import { CreateEmployeeUserAccessDto } from "src/core/dto/employee-user-access/employee-user-access.create.dto";
import { UpdateEmployeeUserAccessDto } from "src/core/dto/employee-user-access/employee-user-access.update.dto";
import { EmployeeUserAccess } from "src/db/entities/EmployeeUserAccess";
import { Repository } from "typeorm";
export declare class EmployeeUserAccessService {
    private readonly employeeUserAccessRepo;
    constructor(employeeUserAccessRepo: Repository<EmployeeUserAccess>);
    getEmployeeUserAccessPagination({ pageSize, pageIndex, order, columnDef, }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: EmployeeUserAccess[];
        total: number;
    }>;
    getByCode(employeeUserAccessCode: any): Promise<EmployeeUserAccess>;
    create(dto: CreateEmployeeUserAccessDto): Promise<EmployeeUserAccess>;
    update(employeeUserAccessCode: any, dto: UpdateEmployeeUserAccessDto): Promise<EmployeeUserAccess>;
    delete(employeeUserAccessCode: any): Promise<EmployeeUserAccess>;
}
