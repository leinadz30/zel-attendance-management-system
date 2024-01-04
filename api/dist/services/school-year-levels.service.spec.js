"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const school_year_levels_service_1 = require("./school-year-levels.service");
describe('SchoolYearLevelsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [school_year_levels_service_1.SchoolYearLevelsService],
        }).compile();
        service = module.get(school_year_levels_service_1.SchoolYearLevelsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=school-year-levels.service.spec.js.map