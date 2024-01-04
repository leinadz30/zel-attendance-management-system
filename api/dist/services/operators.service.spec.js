"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const operators_service_1 = require("./operators.service");
describe('OperatorsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [operators_service_1.OperatorsService],
        }).compile();
        service = module.get(operators_service_1.OperatorsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=operators.service.spec.js.map