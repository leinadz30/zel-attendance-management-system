import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { DefaultSchoolYearLevelDto } from "./school-year-levels-base.dto";

export class CreateSchoolYearLevelDto extends DefaultSchoolYearLevelDto {
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
