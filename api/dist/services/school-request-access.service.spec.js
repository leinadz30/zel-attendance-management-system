"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const school_request_access_service_1 = require("./school-request-access.service");
describe('SchoolRequestAccessService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [school_request_access_service_1.SchoolRequestAccessService],
        }).compile();
        service = module.get(school_request_access_service_1.SchoolRequestAccessService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=school-request-access.service.spec.js.map