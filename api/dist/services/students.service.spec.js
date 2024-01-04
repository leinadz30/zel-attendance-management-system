"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const students_service_1 = require("./students.service");
describe("StudentsService", () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [students_service_1.StudentsService],
        }).compile();
        service = module.get(students_service_1.StudentsService);
    });
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=students.service.spec.js.map