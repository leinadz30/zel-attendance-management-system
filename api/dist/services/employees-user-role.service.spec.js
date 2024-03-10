"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employees_user_role_service_1 = require("./employees-user-role.service");
describe("AccessService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employees_user_role_service_1.EmployeeUserRoleService],
        }).compile();
        service = module.get(employees_user_role_service_1.EmployeeUserRoleService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employees-user-role.service.spec.js.map