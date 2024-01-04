import { CreateStrandDto } from "src/core/dto/strands/strands.create.dto";
import { UpdateStrandDto } from "src/core/dto/strands/strands.update.dto";
import { Strands } from "src/db/entities/Strands";
import { Repository } from "typeorm";
export declare class StrandsService {
    private readonly strandsRepo;
    constructor(strandsRepo: Repository<Strands>);
    getStrandsPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Strands[];
        total: number;
    }>;
    getByCode(strandCode: any): Promise<Strands>;
    create(dto: CreateStrandDto): Promise<Strands>;
    update(strandCode: any, dto: UpdateStrandDto): Promise<Strands>;
    delete(strandCode: any): Promise<Strands>;
}
