import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { CreateOperatorUserDto } from "src/core/dto/operators/operators.create.dto";
import { UpdateOperatorUserDto } from "src/core/dto/operators/operators.update.dto";
import { Operators } from "src/db/entities/Operators";
import { Repository } from "typeorm";
export declare class OperatorsService {
    private readonly operatorRepo;
    constructor(operatorRepo: Repository<Operators>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Operators[];
        total: number;
        requestingAccess: number;
    }>;
    getByCode(operatorCode: any): Promise<Operators>;
    create(dto: CreateOperatorUserDto): Promise<Operators>;
    update(operatorCode: any, dto: UpdateOperatorUserDto): Promise<Operators>;
    resetPassword(operatorCode: any, dto: UpdateUserResetPasswordDto): Promise<Operators>;
    delete(operatorCode: any): Promise<Operators>;
    approveAccessRequest(operatorCode: any): Promise<Operators>;
}
