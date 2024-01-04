import { DefaultMachineDto } from "./machines-base.dto";
export declare class CreateMachineDto extends DefaultMachineDto {
    createdByUserId: string;
    schoolId: string;
}
