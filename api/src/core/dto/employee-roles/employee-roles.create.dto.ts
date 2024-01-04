import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { DefaultEmployeeRolesDto } from "./employee-roles-base.dto";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateEmployeeRolesDto extends DefaultEmployeeRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key]?.toString();
  })
  createdByUserId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key]?.toString();
  })
  schoolId: string;
}
