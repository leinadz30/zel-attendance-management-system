"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tap_logs_controller_1 = require("./tap-logs.controller");
describe("TapLogsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [tap_logs_controller_1.TapLogsController],
        }).compile();
        controller = module.get(tap_logs_controller_1.TapLogsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=tap-logs.controller.spec.js.map