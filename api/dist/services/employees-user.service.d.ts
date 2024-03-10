import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { CreateEmployeeUserDto } from "src/core/dto/employee-user/employee-user.create.dto";
import { UpdateEmployeeUserDto } from "src/core/dto/employee-user/employee-user.update.dto";
import { EmployeeUser } from "src/db/entities/EmployeeUser";
import { Employees } from "src/db/entities/Employees";
import { Repository } from "typeorm";
export declare class EmployeesUserService {
    private readonly employeeUserRepo;
    constructor(employeeUserRepo: Repository<EmployeeUser>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: EmployeeUser[];
        total: number;
    }>;
    createEmployeeUser(dto: CreateEmployeeUserDto): Promise<Employees>;
    updateProfile(employeeCode: any, dto: UpdateEmployeeUserDto): Promise<Employees>;
    updateEmployeeUser(employeeCode: any, dto: UpdateEmployeeUserDto): Promise<Employees>;
    resetPassword(employeeCode: any, dto: UpdateUserResetPasswordDto): Promise<Employees>;
    approveAccessRequest(employeeCode: any): Promise<Employees>;
}
