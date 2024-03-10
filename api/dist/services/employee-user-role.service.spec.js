"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_user_role_service_1 = require("./employee-user-role.service");
describe("EmployeeUserRoleService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employee_user_role_service_1.EmployeeUserRoleService],
        }).compile();
        service = module.get(employee_user_role_service_1.EmployeeUserRoleService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employee-user-role.service.spec.js.map