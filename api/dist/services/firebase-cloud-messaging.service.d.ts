import { ConfigService } from "@nestjs/config";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
export declare class FirebaseCloudMessagingService {
    private readonly config;
    private firebaseProvoder;
    messageConfig: any;
    constructor(config: ConfigService, firebaseProvoder: FirebaseProvider);
    sendToDevice(token: any, title: any, description: any): Promise<void>;
    firebaseSendToDevice(token: any, title: any, description: any): Promise<void>;
}
