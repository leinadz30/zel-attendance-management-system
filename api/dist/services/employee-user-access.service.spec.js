"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_user_access_service_1 = require("./employee-user-access.service");
describe("EmployeeUserAccessService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employee_user_access_service_1.EmployeeUserAccessService],
        }).compile();
        service = module.get(employee_user_access_service_1.EmployeeUserAccessService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employee-user-access.service.spec.js.map