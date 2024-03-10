import { BatchCreateSchoolYearLevelDto, CreateSchoolYearLevelDto } from "src/core/dto/school-year-levels/school-year-levels.create.dto";
import { UpdateSchoolYearLevelDto } from "src/core/dto/school-year-levels/school-year-levels.update.dto";
import { SchoolYearLevels } from "src/db/entities/SchoolYearLevels";
import { Repository } from "typeorm";
export declare class SchoolYearLevelsService {
    private readonly schoolYearLevelsRepo;
    constructor(schoolYearLevelsRepo: Repository<SchoolYearLevels>);
    getSchoolYearLevelsPagination({ pageSize, pageIndex, order, columnDef, }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: SchoolYearLevels[];
        total: number;
    }>;
    getByCode(schoolYearLevelCode: any): Promise<SchoolYearLevels>;
    create(dto: CreateSchoolYearLevelDto): Promise<SchoolYearLevels>;
    batchCreate(dtos: BatchCreateSchoolYearLevelDto[]): Promise<{
        success: any[];
        warning: any[];
        failed: any[];
    }>;
    update(schoolYearLevelCode: any, dto: UpdateSchoolYearLevelDto): Promise<SchoolYearLevels>;
    delete(schoolYearLevelCode: any): Promise<SchoolYearLevels>;
}
