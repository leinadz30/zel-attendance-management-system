"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employees_roles_controller_1 = require("./employees-roles.controller");
describe("EmployeeRolesController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [employees_roles_controller_1.EmployeeRolesController],
        }).compile();
        controller = module.get(employees_roles_controller_1.EmployeeRolesController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=employees-roles.controller.spec.js.map