"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const announcements_service_1 = require("./announcements.service");
let SchedulerService = class SchedulerService {
    constructor(firebaseProvoder, reminderService) {
        this.firebaseProvoder = firebaseProvoder;
        this.reminderService = reminderService;
    }
    async runNotificaiton() {
    }
    async runAnnouncements() {
    }
    async firebaseSendAnnouncements(title, description) {
    }
    async firebaseSendToDevice(token, title, description) {
    }
};
SchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider,
        announcements_service_1.AnnouncementsService])
], SchedulerService);
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.service.js.map