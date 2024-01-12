import { LinkStudentRequest } from "./LinkStudentRequest";
import { ParentStudent } from "./ParentStudent";
import { Users } from "./Users";
export declare class Parents {
    parentId: string;
    parentCode: string | null;
    fullName: string;
    gender: string;
    birthDate: string | null;
    mobileNumber: string;
    email: string | null;
    address: string;
    registrationDate: Date;
    updatedDate: Date | null;
    active: boolean;
    linkStudentRequests: LinkStudentRequest[];
    parentStudents: ParentStudent[];
    registeredByUser: Users;
    updatedByUser: Users;
    user: Users;
}
