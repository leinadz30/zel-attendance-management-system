import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { AnnouncementsService } from "./announcements.service";
export declare class SchedulerService {
    private firebaseProvoder;
    private reminderService;
    constructor(firebaseProvoder: FirebaseProvider, reminderService: AnnouncementsService);
    runNotificaiton(): Promise<void>;
    runAnnouncements(): Promise<void>;
    firebaseSendAnnouncements(title: any, description: any): Promise<void>;
    firebaseSendToDevice(token: any, title: any, description: any): Promise<void>;
}
