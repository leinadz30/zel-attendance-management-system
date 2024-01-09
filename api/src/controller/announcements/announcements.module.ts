import { Module } from "@nestjs/common";
import { AnnouncementsController } from "./announcements.controller";
import { Announcements } from "src/db/entities/Announcements";
import { AnnouncementsService } from "src/services/announcements.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Announcements])],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
  exports: [AnnouncementsService],
})
export class AnnouncementsModule {}
