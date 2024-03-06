export declare class AccessPagesDto {
    page: string;
    view: boolean;
    modify: boolean;
    rights: string[];
}
export declare class DefaultEmployeeUserRoleDto {
    name: string;
    accessPages: AccessPagesDto[];
}
