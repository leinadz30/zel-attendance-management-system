import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { CreateEmployeeUserDto, CreateEmployeeUserFromEmployeeDto } from "src/core/dto/employee-user/employee-user.create.dto";
import { UpdateEmployeeUserDto, UpdateEmployeeUserProfileDto } from "src/core/dto/employee-user/employee-user.update.dto";
import { EmployeeUser } from "src/db/entities/EmployeeUser";
import { Repository } from "typeorm";
export declare class EmployeeUserService {
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
    getByEmployeeCode(employeeCode: any): Promise<EmployeeUser>;
    create(dto: CreateEmployeeUserDto): Promise<EmployeeUser>;
    createFromEmployee(dto: CreateEmployeeUserFromEmployeeDto): Promise<EmployeeUser>;
    updateProfile(employeeCode: any, dto: UpdateEmployeeUserProfileDto): Promise<EmployeeUser>;
    update(employeeCode: any, dto: UpdateEmployeeUserDto): Promise<EmployeeUser>;
    updatePassword(employeeCode: any, dto: UpdateUserResetPasswordDto): Promise<EmployeeUser>;
    approveAccessRequest(employeeCode: any): Promise<EmployeeUser>;
    delete(employeeCode: any): Promise<EmployeeUser>;
}
