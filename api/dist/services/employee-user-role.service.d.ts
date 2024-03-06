import { CreateEmployeeUserRoleDto } from "src/core/dto/employee-user-role/employee-user-role.create.dto";
import { UpdateEmployeeUserRoleDto } from "src/core/dto/employee-user-role/employee-user-role.update.dto";
import { EmployeeUserRole } from "src/db/entities/EmployeeUserRole";
import { Repository } from "typeorm";
export declare class EmployeeUserRoleService {
    private readonly employeeUserRoleRepo;
    constructor(employeeUserRoleRepo: Repository<EmployeeUserRole>);
    getEmployeeUserRolePagination({ pageSize, pageIndex, order, columnDef, }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: EmployeeUserRole[];
        total: number;
    }>;
    getByCode(employeeUserRoleCode: any): Promise<EmployeeUserRole>;
    create(dto: CreateEmployeeUserRoleDto): Promise<EmployeeUserRole>;
    update(employeeUserRoleCode: any, dto: UpdateEmployeeUserRoleDto): Promise<EmployeeUserRole>;
    delete(employeeUserRoleCode: any): Promise<EmployeeUserRole>;
}
