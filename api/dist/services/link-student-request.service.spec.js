"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const link_student_request_service_1 = require("./link-student-request.service");
describe('LinkStudentRequestService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [link_student_request_service_1.LinkStudentRequestService],
        }).compile();
        service = module.get(link_student_request_service_1.LinkStudentRequestService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=link-student-request.service.spec.js.map