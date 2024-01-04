import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
export declare class OneSignalNotificationService {
    private readonly httpService;
    private readonly config;
    constructor(httpService: HttpService, config: ConfigService);
    sendToSubscriber(subscriptionIds: any[], type: any, referenceId: any, title: any, description: any): Promise<any>;
}
