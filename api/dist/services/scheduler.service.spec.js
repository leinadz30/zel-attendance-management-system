"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const scheduler_service_1 = require("./scheduler.service");
describe("SchedulerService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [scheduler_service_1.SchedulerService],
        }).compile();
        service = module.get(scheduler_service_1.SchedulerService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=scheduler.service.spec.js.map