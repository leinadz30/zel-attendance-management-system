import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { DefaultAnnouncementDto } from "./announcements-base.dto";

export class UpdateAnnouncementDto extends DefaultAnnouncementDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Transform(({ obj, key }) => {
    return obj[key]?.toString();
  })
  updatedByUserId: string;
}
