import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  IsArray,
  ValidateNested,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsUppercase,
  Matches,
} from "class-validator";
export class BatchCreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  middleInitial: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  mobileNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  orgStudentId: string;

  @ApiProperty()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsOptional()
  courseName: string;

  @ApiProperty()
  @IsOptional()
  strandName: string;

  @ApiProperty()
  @IsOptional()
  sectionName: string;

  @ApiProperty()
  @IsNotEmpty()
  departmentName: string;

  @ApiProperty()
  @IsNotEmpty()
  schoolYearLeveName: string;

  @ApiProperty()
  @IsNotEmpty()
  orgSchoolId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key]?.toString();
  })
  registeredByUserId: string;

  @ApiProperty()
  @IsNotEmpty()
  refId: string;
}
