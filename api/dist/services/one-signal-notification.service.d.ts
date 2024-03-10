import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
export declare class OneSignalNotificationService {
    private readonly httpService;
    private readonly config;
    constructor(httpService: HttpService, config: ConfigService);
    sendToSubscriber(subscriptionId: string, type: "ANNOUNCEMENT" | "LINK_STUDENT" | "STUDENT_LOGIN_LOGOUT" | "EMPLOYEE_LOGIN_LOGOUT", referenceId: any, notificationIds: any[], title: any, description: any): Promise<{
        subscriptionId: string;
        success: boolean;
    }>;
    sendToExternalUser(userId: string, type: "ANNOUNCEMENT" | "LINK_STUDENT" | "STUDENT_LOGIN_LOGOUT" | "EMPLOYEE_LOGIN_LOGOUT", referenceId: any, notificationIds: any[], title: any, description: any): Promise<{
        userId: string;
        success: boolean;
    }>;
    setExternalUserId(subscriptionId: string, externalUserId: string): Promise<any>;
    setTags(subscriptionId: string, tags: any): Promise<any>;
}
