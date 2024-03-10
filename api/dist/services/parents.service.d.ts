import { UpdateUserResetPasswordDto } from "src/core/dto/auth/reset-password.dto";
import { UpdateProfilePictureDto } from "src/core/dto/auth/reset-password.dto copy";
import { UpdateParentUserProfileDto } from "src/core/dto/parents/parents.update.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { Parents } from "src/db/entities/Parents";
import { Students } from "src/db/entities/Students";
import { Repository } from "typeorm";
export declare class ParentsService {
    private firebaseProvoder;
    private readonly parentRepo;
    constructor(firebaseProvoder: FirebaseProvider, parentRepo: Repository<Parents>);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: Parents[];
        total: number;
    }>;
    getByCode(parentCode: any): Promise<Parents>;
    getParentStudents(parentCode: any): Promise<Students[]>;
    updateProfile(parentCode: any, dto: UpdateParentUserProfileDto): Promise<Parents>;
    resetPassword(parentCode: any, dto: UpdateUserResetPasswordDto): Promise<Parents>;
    delete(parentCode: any): Promise<Parents>;
    approveAccessRequest(parentCode: any): Promise<Parents>;
    updateProfilePicture(parentCode: any, dto: UpdateProfilePictureDto): Promise<Parents>;
}
