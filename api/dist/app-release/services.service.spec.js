"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const services_service_1 = require("./services.service");
describe('ServicesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [services_service_1.ServicesService],
        }).compile();
        service = module.get(services_service_1.ServicesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=services.service.spec.js.map