export declare class AccessPagesDto {
    page: string;
    view: boolean;
    modify: boolean;
    rights: string[];
}
export declare class DefaultEmployeeUserAccessDto {
    name: string;
    accessPages: AccessPagesDto[];
}
