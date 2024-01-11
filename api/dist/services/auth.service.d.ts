import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Users } from "src/db/entities/Users";
import { Employees } from "src/db/entities/Employees";
import { Operators } from "src/db/entities/Operators";
import { RegisterEmployeeUserDto } from "src/core/dto/auth/register-employee.dto";
import { RegisterOperatorUserDto } from "src/core/dto/auth/register-operator.dto";
import { Parents } from "src/db/entities/Parents";
import { RegisterParentUserDto } from "src/core/dto/auth/register-parent.dto";
import { EmployeeUser } from "src/db/entities/EmployeeUser";
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<Users>, jwtService: JwtService);
    getOperatorsByCredentials(userName: any, password: any): Promise<Operators>;
    getEmployeesByCredentials({ userName, password, schoolCode }: {
        userName: any;
        password: any;
        schoolCode: any;
    }): Promise<EmployeeUser>;
    getParentsByCredentials(userName: any, password: any): Promise<{
        totalUnreadNotif: number;
        parentId: string;
        parentCode: string;
        firstName: string;
        middleInitial: string;
        lastName: string;
        gender: string;
        birthDate: string;
        mobileNumber: string;
        email: string;
        address: string;
        registrationDate: Date;
        updatedDate: Date;
        active: boolean;
        fullName: string;
        linkStudentRequests: import("../db/entities/LinkStudentRequest").LinkStudentRequest[];
        parentStudents: import("../db/entities/ParentStudent").ParentStudent[];
        registeredByUser: Users;
        updatedByUser: Users;
        user: Users;
    }>;
    getByCredentials({ userName, password }: {
        userName: any;
        password: any;
    }): Promise<Operators | Employees | Parents>;
    getUserById(userId: any): Promise<Users>;
    registerEmployee(dto: RegisterEmployeeUserDto): Promise<Employees>;
    registerParent(dto: RegisterParentUserDto): Promise<Parents>;
    registerOperator(dto: RegisterOperatorUserDto): Promise<Operators>;
}
