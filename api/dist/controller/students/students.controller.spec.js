"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const students_controller_1 = require("./students.controller");
describe("StudentsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [students_controller_1.StudentsController],
        }).compile();
        controller = module.get(students_controller_1.StudentsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=students.controller.spec.js.map