import { CreateTapLogDto } from "src/core/dto/tap-logs/tap-logs.create.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { TapLogs } from "src/db/entities/TapLogs";
import { Users } from "src/db/entities/Users";
import { Repository, EntityManager } from "typeorm";
import { PusherService } from "./pusher.service";
import { FirebaseCloudMessagingService } from "./firebase-cloud-messaging.service";
import { OneSignalNotificationService } from "./one-signal-notification.service";
export declare class TapLogsService {
    private readonly tapLogsRepo;
    private pusherService;
    private firebaseProvoder;
    private firebaseCloudMessagingService;
    private oneSignalNotificationService;
    constructor(tapLogsRepo: Repository<TapLogs>, pusherService: PusherService, firebaseProvoder: FirebaseProvider, firebaseCloudMessagingService: FirebaseCloudMessagingService, oneSignalNotificationService: OneSignalNotificationService);
    getPagination({ pageSize, pageIndex, order, columnDef }: {
        pageSize: any;
        pageIndex: any;
        order: any;
        columnDef: any;
    }): Promise<{
        results: TapLogs[];
        total: number;
    }>;
    getStudentsTapsByParentCode(parentCode: any, date: any): Promise<any[]>;
    getStudentsTapsByStudentCode(studentCode: any, date: any): Promise<TapLogs[]>;
    getById(tapLogId: any): Promise<TapLogs>;
    create(dto: CreateTapLogDto): Promise<TapLogs>;
    createBatch(dtos: CreateTapLogDto[]): Promise<any[]>;
    logNotification(users: Users[], referenceId: any, entityManager: EntityManager, title: string, description: string): Promise<void>;
}
