"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_release_service_1 = require("./app-release.service");
describe('AppReleaseService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [app_release_service_1.AppReleaseService],
        }).compile();
        service = module.get(app_release_service_1.AppReleaseService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=app-release.service.spec.js.map