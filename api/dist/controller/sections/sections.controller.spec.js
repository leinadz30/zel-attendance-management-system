"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sections_controller_1 = require("./sections.controller");
describe("SectionsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [sections_controller_1.SectionsController],
        }).compile();
        controller = module.get(sections_controller_1.SectionsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=sections.controller.spec.js.map