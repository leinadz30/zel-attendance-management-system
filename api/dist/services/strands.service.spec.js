"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const strands_service_1 = require("./strands.service");
describe('StrandsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [strands_service_1.StrandsService],
        }).compile();
        service = module.get(strands_service_1.StrandsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=strands.service.spec.js.map