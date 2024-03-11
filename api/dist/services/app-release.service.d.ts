import { CreateAppReleaseDto } from "src/core/dto/app-release/app-release.create.dto";
import { UpdateAppReleaseDto } from "src/core/dto/app-release/app-release.update.dto";
import { AppRelease } from "src/db/entities/AppRelease";
import { Repository } from "typeorm";
export declare class AppReleaseService {
    private readonly appReleaseRepo;
    constructor(appReleaseRepo: Repository<AppRelease>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: AppRelease[];
        total: number;
    }>;
    getLatestVersion(appTypeCode: "A" | "I" | "W"): Promise<{
        id: any;
        description: any;
        appTypeCode: any;
        appVersion: any;
        appBuild: any;
        date: string;
    }>;
    getByCode(id: any): Promise<AppRelease>;
    create(dto: CreateAppReleaseDto): Promise<AppRelease>;
    update(id: any, dto: UpdateAppReleaseDto): Promise<AppRelease>;
    delete(id: any): Promise<AppRelease>;
}
