import { LinkStudentRequest } from "./LinkStudentRequest";
import { ParentStudent } from "./ParentStudent";
import { Users } from "./Users";
export declare class Parents {
    parentId: string;
    parentCode: string | null;
    firstName: string;
    middleInitial: string | null;
    lastName: string;
    gender: string;
    birthDate: string | null;
    mobileNumber: string;
    email: string | null;
    address: string;
    registrationDate: Date;
    updatedDate: Date | null;
    active: boolean;
    fullName: string;
    linkStudentRequests: LinkStudentRequest[];
    parentStudents: ParentStudent[];
    registeredByUser: Users;
    updatedByUser: Users;
    user: Users;
}
