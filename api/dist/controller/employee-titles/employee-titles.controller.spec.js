"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const employee_titles_controller_1 = require("./employee-titles.controller");
describe("EmployeeTitlesController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [employee_titles_controller_1.EmployeeTitlesController],
        }).compile();
        controller = module.get(employee_titles_controller_1.EmployeeTitlesController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=employee-titles.controller.spec.js.map