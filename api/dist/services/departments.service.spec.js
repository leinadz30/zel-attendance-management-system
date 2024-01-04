"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const departments_service_1 = require("./departments.service");
describe('DepartmentsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [departments_service_1.DepartmentsService],
        }).compile();
        service = module.get(departments_service_1.DepartmentsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=departments.service.spec.js.map