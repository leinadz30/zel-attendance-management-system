"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tap_logs_service_1 = require("./tap-logs.service");
describe('TapLogsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [tap_logs_service_1.TapLogsService],
        }).compile();
        service = module.get(tap_logs_service_1.TapLogsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=tap-logs.service.spec.js.map