import { BatchCreateStudentDto } from "src/core/dto/students/students.batch-create.dto";
import { CreateStudentDto } from "src/core/dto/students/students.create.dto";
import { UpdateStudentDto } from "src/core/dto/students/students.update.dto";
import { Students } from "src/db/entities/Students";
import { Repository } from "typeorm";
export declare class StudentsService {
    private readonly studentRepo;
    constructor(studentRepo: Repository<Students>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Students[];
        total: number;
    }>;
    getByCode(studentCode: any): Promise<Students>;
    getByOrgStudentId(orgStudentId: any): Promise<Students>;
    create(dto: CreateStudentDto): Promise<Students>;
    createBatch(dtos: BatchCreateStudentDto[]): Promise<{
        success: any[];
        duplicates: any[];
        failed: any[];
    }>;
    update(studentCode: any, dto: UpdateStudentDto): Promise<Students>;
    delete(studentCode: any): Promise<Students>;
    approveAccessRequest(studentCode: any): Promise<Students>;
}
