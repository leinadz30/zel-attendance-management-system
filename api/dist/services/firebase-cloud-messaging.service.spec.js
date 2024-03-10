"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const firebase_cloud_messaging_service_1 = require("./firebase-cloud-messaging.service");
describe('FirebaseCloudMessagingService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [firebase_cloud_messaging_service_1.FirebaseCloudMessagingService],
        }).compile();
        service = module.get(firebase_cloud_messaging_service_1.FirebaseCloudMessagingService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=firebase-cloud-messaging.service.spec.js.map