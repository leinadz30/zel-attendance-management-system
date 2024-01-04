import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeRolesController } from "./employees-roles.controller";

describe("EmployeeRolesController", () => {
  let controller: EmployeeRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeRolesController],
    }).compile();

    controller = module.get<EmployeeRolesController>(EmployeeRolesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
