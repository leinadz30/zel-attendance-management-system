"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_user_role_controller_1 = require("./employee-user-role.controller");
describe("EmployeeUserRoleController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [employee_user_role_controller_1.EmployeeUserRoleController],
        }).compile();
        controller = module.get(employee_user_role_controller_1.EmployeeUserRoleController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=employee-user-role.controller.spec.js.map