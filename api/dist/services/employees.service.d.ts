import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { CreateEmployeeDto, CreateEmployeeUserDto } from "src/core/dto/employees/employees.create.dto";
import { UpdateEmployeeDto, UpdateEmployeeUserDto } from "src/core/dto/employees/employees.update.dto";
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
    createEmployeeUser(dto: CreateEmployeeUserDto): Promise<Employees>;
    updateProfile(employeeCode: any, dto: UpdateEmployeeDto): Promise<Employees>;
    update(employeeCode: any, dto: UpdateEmployeeDto): Promise<Employees>;
    updateEmployeeUser(employeeCode: any, dto: UpdateEmployeeUserDto): Promise<Employees>;
    resetPassword(employeeCode: any, dto: UpdateUserResetPasswordDto): Promise<Employees>;
    delete(employeeCode: any): Promise<Employees>;
    approveAccessRequest(employeeCode: any): Promise<Employees>;
}
