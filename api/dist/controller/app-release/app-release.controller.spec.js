"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_release_controller_1 = require("./app-release.controller");
describe("AppReleaseController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [app_release_controller_1.AppReleaseController],
        }).compile();
        controller = module.get(app_release_controller_1.AppReleaseController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=app-release.controller.spec.js.map