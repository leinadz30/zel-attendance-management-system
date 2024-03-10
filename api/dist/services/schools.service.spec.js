"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const schools_service_1 = require("./schools.service");
describe('SchoolsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [schools_service_1.SchoolsService],
        }).compile();
        service = module.get(schools_service_1.SchoolsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=schools.service.spec.js.map