"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const parents_service_1 = require("./parents.service");
describe('ParentsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [parents_service_1.ParentsService],
        }).compile();
        service = module.get(parents_service_1.ParentsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=parents.service.spec.js.map