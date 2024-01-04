import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class DefaultEmployeeRolesDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  employeeRoleAccess: string[];
}