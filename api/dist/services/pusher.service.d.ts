import { ConfigService } from "@nestjs/config";
export declare class PusherService {
    private readonly config;
    pusher: any;
    constructor(config: ConfigService);
    trigger(channel: any, event: any, data: any): void;
    reSync(type: string, data: any): Promise<void>;
    sendNotif(userIds: string[], notificationIds: string[], referenceId: any, type: "LINK_STUDENT" | "STUDENT_LOGIN_LOGOUT" | "ANNOUNCEMENT", title: string, description: any): Promise<void>;
    mobileOneSignalScanner(): Promise<void>;
}
