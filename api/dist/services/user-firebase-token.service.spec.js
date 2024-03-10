"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_firebase_token_service_1 = require("./user-firebase-token.service");
describe("UserFirebaseTokenService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [user_firebase_token_service_1.UserFirebaseTokenService],
        }).compile();
        service = module.get(user_firebase_token_service_1.UserFirebaseTokenService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=user-firebase-token.service.spec.js.map