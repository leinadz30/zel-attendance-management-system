import { Parents } from "./Parents";
import { Students } from "./Students";
export declare class ParentStudent {
    parentId: string;
    studentId: string;
    dateAdded: Date;
    active: boolean;
    parent: Parents;
    student: Students;
}
