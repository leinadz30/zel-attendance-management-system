"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sections_service_1 = require("./sections.service");
describe('SectionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sections_service_1.SectionsService],
        }).compile();
        service = module.get(sections_service_1.SectionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sections.service.spec.js.map