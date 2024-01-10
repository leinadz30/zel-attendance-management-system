import { BatchCreateSectionDto, CreateSectionDto } from "src/core/dto/sections/sections.create.dto";
import { UpdateSectionDto } from "src/core/dto/sections/sections.update.dto";
import { Sections } from "src/db/entities/Sections";
import { Repository } from "typeorm";
export declare class SectionsService {
    private readonly sectionsRepo;
    constructor(sectionsRepo: Repository<Sections>);
    getSectionsPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Sections[];
        total: number;
    }>;
    getByCode(sectionCode: any): Promise<Sections>;
    create(dto: CreateSectionDto): Promise<Sections>;
    batchCreate(dtos: BatchCreateSectionDto[]): Promise<{
        success: any[];
        warning: any[];
        failed: any[];
    }>;
    update(sectionCode: any, dto: UpdateSectionDto): Promise<Sections>;
    delete(sectionCode: any): Promise<Sections>;
}
