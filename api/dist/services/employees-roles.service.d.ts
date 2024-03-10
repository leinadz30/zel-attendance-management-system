import { CreateEmployeeUserRolesDto } from "src/core/dto/employee-roles/employee-roles.create.dto";
import { UpdateEmployeeUserRolesDto } from "src/core/dto/employee-roles/employee-roles.update.dto";
import { EmployeeUserRoles } from "src/db/entities/EmployeeUserRoles";
import { Repository } from "typeorm";
export declare class EmployeeUserRolesService {
    private readonly employeeRolesRepo;
    constructor(employeeRolesRepo: Repository<EmployeeUserRoles>);
    getEmployeeUserRolesPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: EmployeeUserRoles[];
        total: number;
    }>;
    getByCode(employeeRoleCode: any): Promise<EmployeeUserRoles>;
    create(dto: CreateEmployeeUserRolesDto): Promise<any>;
    update(employeeRoleCode: any, dto: UpdateEmployeeUserRolesDto): Promise<{
        employeeRoleCode: any;
        active: boolean;
    }>;
    delete(employeeRoleCode: any): Promise<{
        employeeRoleCode: any;
        active: boolean;
    }>;
}
