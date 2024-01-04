"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const schools_controller_1 = require("./schools.controller");
describe("SchoolsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [schools_controller_1.SchoolsController],
        }).compile();
        controller = module.get(schools_controller_1.SchoolsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=schools.controller.spec.js.map