"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_user_access_controller_1 = require("./employee-user-access.controller");
describe("EmployeeUserAccessController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [employee_user_access_controller_1.EmployeeUserAccessController],
        }).compile();
        controller = module.get(employee_user_access_controller_1.EmployeeUserAccessController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=employee-user-access.controller.spec.js.map