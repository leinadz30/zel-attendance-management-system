"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const link_student_request_controller_1 = require("./link-student-request.controller");
describe("LinkStudentRequestController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [link_student_request_controller_1.LinkStudentRequestController],
        }).compile();
        controller = module.get(link_student_request_controller_1.LinkStudentRequestController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=link-student-request.controller.spec.js.map