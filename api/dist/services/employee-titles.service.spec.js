"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_titles_service_1 = require("./employee-titles.service");
describe('EmployeeTitlesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employee_titles_service_1.EmployeeTitlesService],
        }).compile();
        service = module.get(employee_titles_service_1.EmployeeTitlesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employee-titles.service.spec.js.map