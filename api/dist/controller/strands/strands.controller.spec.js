"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const strands_controller_1 = require("./strands.controller");
describe("StrandsController", () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [strands_controller_1.StrandsController],
        }).compile();
        controller = module.get(strands_controller_1.StrandsController);
    });
    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=strands.controller.spec.js.map