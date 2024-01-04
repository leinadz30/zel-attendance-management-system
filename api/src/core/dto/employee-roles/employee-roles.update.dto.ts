import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { DefaultEmployeeRolesDto } from "./employee-roles-base.dto";
export class UpdateEmployeeRolesDto extends DefaultEmployeeRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key]?.toString();
  })
  updatedByUserId: string;
}
