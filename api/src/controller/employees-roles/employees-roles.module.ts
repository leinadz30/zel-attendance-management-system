import { Module } from "@nestjs/common";
import { EmployeeRolesController } from "./employees-roles.controller";
import { EmployeeRoles } from "src/db/entities/EmployeeRoles";
import { EmployeeRolesService } from "src/services/employees-roles.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeRoles])],
  controllers: [EmployeeRolesController],
  providers: [EmployeeRolesService],
  exports: [EmployeeRolesService],
})
export class EmployeeRolesModule {}
