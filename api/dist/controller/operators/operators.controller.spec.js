"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const operators_controller_1 = require("./operators.controller");
describe("OperatorsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [operators_controller_1.OperatorsController],
        }).compile();
        controller = module.get(operators_controller_1.OperatorsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=operators.controller.spec.js.map