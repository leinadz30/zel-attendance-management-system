"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const departments_controller_1 = require("./departments.controller");
describe("DepartmentsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [departments_controller_1.DepartmentsController],
        }).compile();
        controller = module.get(departments_controller_1.DepartmentsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=departments.controller.spec.js.map