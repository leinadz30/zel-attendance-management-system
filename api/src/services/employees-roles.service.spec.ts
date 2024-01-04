import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeRolesService } from "./employees-roles.service";

describe("AccessService", () => {
  let service: EmployeeRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeRolesService],
    }).compile();

    service = module.get<EmployeeRolesService>(EmployeeRolesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
