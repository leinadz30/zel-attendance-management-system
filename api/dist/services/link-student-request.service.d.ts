import { CreateLinkStudentRequestDto } from "src/core/dto/link-student-request/link-student-request.create.dto";
import { UpdateLinkStudentRequestStatusDto } from "src/core/dto/link-student-request/link-student-request.update.dto";
import { LinkStudentRequest } from "src/db/entities/LinkStudentRequest";
import { Users } from "src/db/entities/Users";
import { EntityManager, Repository } from "typeorm";
import { PusherService } from "./pusher.service";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { OneSignalNotificationService } from "./one-signal-notification.service";
export declare class LinkStudentRequestService {
    private readonly linkStudentRequestRepo;
    private pusherService;
    private firebaseProvoder;
    private oneSignalNotificationService;
    constructor(linkStudentRequestRepo: Repository<LinkStudentRequest>, pusherService: PusherService, firebaseProvoder: FirebaseProvider, oneSignalNotificationService: OneSignalNotificationService);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: LinkStudentRequest[];
        total: number;
    }>;
    getByCode(linkStudentRequestCode: any): Promise<LinkStudentRequest>;
    create(dto: CreateLinkStudentRequestDto): Promise<LinkStudentRequest>;
    approve(linkStudentRequestCode: any, dto: UpdateLinkStudentRequestStatusDto): Promise<LinkStudentRequest>;
    reject(linkStudentRequestCode: any, dto: UpdateLinkStudentRequestStatusDto): Promise<LinkStudentRequest>;
    cancel(linkStudentRequestCode: any, dto: UpdateLinkStudentRequestStatusDto): Promise<LinkStudentRequest>;
    logNotification(user: Users, referenceId: any, entityManager: EntityManager, title: string, description: string): Promise<void>;
}
