"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const school_year_levels_controller_1 = require("./school-year-levels.controller");
describe("SchoolYearLevelsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [school_year_levels_controller_1.SchoolYearLevelsController],
        }).compile();
        controller = module.get(school_year_levels_controller_1.SchoolYearLevelsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=school-year-levels.controller.spec.js.map