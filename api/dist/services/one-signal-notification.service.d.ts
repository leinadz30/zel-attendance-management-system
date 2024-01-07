import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
export declare class OneSignalNotificationService {
    private readonly httpService;
    private readonly config;
    constructor(httpService: HttpService, config: ConfigService);
    sendToSubscriber(subscriptionId: string, type: any, referenceId: any, notificationIds: any[], title: any, description: any): Promise<{
        subscriptionId: string;
        success: boolean;
    }>;
}
