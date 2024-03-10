"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_firebase_token_controller_1 = require("./user-firebase-token.controller");
describe('UserFirebaseTokenController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [user_firebase_token_controller_1.UserFirebaseTokenController],
        }).compile();
        controller = module.get(user_firebase_token_controller_1.UserFirebaseTokenController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=user-firebase-token.controller.spec.js.map