import { CreateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.create.dto";
import { UpdateEmployeeRolesDto } from "src/core/dto/employee-roles/employee-roles.update.dto";
import { EmployeeRoles } from "src/db/entities/EmployeeRoles";
import { Repository } from "typeorm";
export declare class EmployeeRolesService {
    private readonly employeeRolesRepo;
    constructor(employeeRolesRepo: Repository<EmployeeRoles>);
    getEmployeeRolesPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: EmployeeRoles[];
        total: number;
    }>;
    getByCode(employeeRoleCode: any): Promise<EmployeeRoles>;
    create(dto: CreateEmployeeRolesDto): Promise<EmployeeRoles>;
    update(employeeRoleCode: any, dto: UpdateEmployeeRolesDto): Promise<EmployeeRoles>;
    delete(employeeRoleCode: any): Promise<EmployeeRoles>;
}
