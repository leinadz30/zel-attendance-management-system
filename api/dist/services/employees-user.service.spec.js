"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employes_user_service_1 = require("./employes-user.service");
describe('EmployeesUserService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employes_user_service_1.EmployeesUserService],
        }).compile();
        service = module.get(employes_user_service_1.EmployeesUserService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employees-user.service.spec.js.map