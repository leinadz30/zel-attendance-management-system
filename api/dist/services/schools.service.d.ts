import { UpdateSchoolDto } from "src/core/dto/schools/schools.update.dto";
import { CreateSchoolDto } from "src/core/dto/schools/schools.create.dto";
import { Schools } from "src/db/entities/Schools";
import { Repository } from "typeorm";
export declare class SchoolsService {
    private readonly schoolsRepo;
    constructor(schoolsRepo: Repository<Schools>);
    getSchoolsPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Schools[];
        total: number;
    }>;
    getByCode(schoolCode: any): Promise<Schools>;
    getByOrgCode(orgSchoolCode: any): Promise<Schools>;
    create(dto: CreateSchoolDto): Promise<Schools>;
    batchCreate(dtos: CreateSchoolDto[]): Promise<any[]>;
    update(schoolCode: any, dto: UpdateSchoolDto): Promise<Schools>;
    delete(schoolCode: any): Promise<Schools>;
}
