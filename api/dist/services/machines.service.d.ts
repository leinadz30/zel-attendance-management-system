import { CreateMachineDto } from "src/core/dto/machines/machines.create.dto";
import { UpdateMachineDto } from "src/core/dto/machines/machines.update.dto";
import { Machines } from "src/db/entities/Machines";
import { Repository } from "typeorm";
export declare class MachinesService {
    private readonly machinesRepo;
    constructor(machinesRepo: Repository<Machines>);
    getMachinesPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Machines[];
        total: number;
    }>;
    getByCode(machineCode: any): Promise<Machines>;
    create(dto: CreateMachineDto): Promise<Machines>;
    batchCreate(dtos: CreateMachineDto[]): Promise<any[]>;
    update(machineCode: any, dto: UpdateMachineDto): Promise<Machines>;
    delete(machineCode: any): Promise<Machines>;
}
