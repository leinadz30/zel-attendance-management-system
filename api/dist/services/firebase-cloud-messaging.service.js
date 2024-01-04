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
exports.FirebaseCloudMessagingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
let FirebaseCloudMessagingService = class FirebaseCloudMessagingService {
    constructor(config, firebaseProvoder) {
        this.config = config;
        this.firebaseProvoder = firebaseProvoder;
        this.messageConfig = {
            android: {
                notification: {
                    imageUrl: this.config.get("FIREBASE_CLOUD_MESSAGING_IMAGE"),
                },
                priority: this.config.get("FIREBASE_CLOUD_MESSAGING_PRIO"),
            },
            apns: {
                payload: {},
                fcmOptions: {
                    imageUrl: this.config.get("FIREBASE_CLOUD_MESSAGING_IMAGE"),
                },
            },
            webpush: {
                headers: {
                    image: this.config.get("FIREBASE_CLOUD_MESSAGING_IMAGE"),
                },
            },
        };
    }
    async sendToDevice(token, title, description) {
        const payload = Object.assign({ token, notification: {
                title: title,
                body: description,
            } }, this.messageConfig);
        return await this.firebaseProvoder.app
            .messaging()
            .send(payload)
            .then(() => {
            console.log("Successfully sent message");
        })
            .catch((error) => {
            console.log(`Error sending notif! ${error.message}`);
        });
    }
    async firebaseSendToDevice(token, title, description) {
        return await this.firebaseProvoder.app
            .messaging()
            .sendToDevice(token, {
            notification: {
                title: title,
                body: description,
                sound: "notif_alert",
            },
        }, {
            priority: "high",
            timeToLive: 60 * 24,
            android: { sound: "notif_alert" },
        })
            .then((response) => {
            console.log("Successfully sent message:", response);
        })
            .catch((error) => {
            throw new common_1.HttpException(`Error sending notif! ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
FirebaseCloudMessagingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        firebase_provider_1.FirebaseProvider])
], FirebaseCloudMessagingService);
exports.FirebaseCloudMessagingService = FirebaseCloudMessagingService;
//# sourceMappingURL=firebase-cloud-messaging.service.js.map