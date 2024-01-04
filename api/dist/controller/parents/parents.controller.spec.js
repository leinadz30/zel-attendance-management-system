"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const parents_controller_1 = require("./parents.controller");
describe("ParentsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [parents_controller_1.ParentsController],
        }).compile();
        controller = module.get(parents_controller_1.ParentsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=parents.controller.spec.js.map