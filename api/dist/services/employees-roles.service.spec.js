"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employees_roles_service_1 = require("./employees-roles.service");
describe("AccessService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [employees_roles_service_1.EmployeeRolesService],
        }).compile();
        service = module.get(employees_roles_service_1.EmployeeRolesService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=employees-roles.service.spec.js.map