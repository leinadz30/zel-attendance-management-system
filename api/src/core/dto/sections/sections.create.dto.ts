import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { DefaultSectionDto } from "./sections-base.dto";

export class CreateSectionDto extends DefaultSectionDto {
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
