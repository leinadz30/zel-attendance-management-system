"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapLogsModule = void 0;
const common_1 = require("@nestjs/common");
const tap_logs_controller_1 = require("./tap-logs.controller");
const TapLogs_1 = require("../../db/entities/TapLogs");
const tap_logs_service_1 = require("../../services/tap-logs.service");
const typeorm_1 = require("@nestjs/typeorm");
const firebase_provider_module_1 = require("../../core/provider/firebase/firebase-provider.module");
const pusher_service_1 = require("../../services/pusher.service");
const firebase_cloud_messaging_service_1 = require("../../services/firebase-cloud-messaging.service");
const axios_1 = require("@nestjs/axios");
const one_signal_notification_service_1 = require("../../services/one-signal-notification.service");
let TapLogsModule = class TapLogsModule {
};
TapLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            firebase_provider_module_1.FirebaseProviderModule,
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([TapLogs_1.TapLogs]),
        ],
        controllers: [tap_logs_controller_1.TapLogsController],
        providers: [
            tap_logs_service_1.TapLogsService,
            pusher_service_1.PusherService,
            firebase_cloud_messaging_service_1.FirebaseCloudMessagingService,
            one_signal_notification_service_1.OneSignalNotificationService,
        ],
        exports: [
            tap_logs_service_1.TapLogsService,
            pusher_service_1.PusherService,
            firebase_cloud_messaging_service_1.FirebaseCloudMessagingService,
            one_signal_notification_service_1.OneSignalNotificationService,
        ],
    })
], TapLogsModule);
exports.TapLogsModule = TapLogsModule;
//# sourceMappingURL=tap-logs.module.js.map