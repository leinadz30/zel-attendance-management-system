import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsUppercase,
  ValidateNested,
} from "class-validator";

export class DefaultAnnouncementDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  targetDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(["DRAFT", "SEND"])
  @IsUppercase()
  targetType: "SEND" | "SEND";

  @ApiProperty()
  @IsNotEmpty()
  targetIds: string[];

  @ApiProperty()
  @IsNotEmpty()
  scheduled: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(["DRAFT", "SEND"])
  @IsUppercase()
  action: "SEND" | "SEND";
}