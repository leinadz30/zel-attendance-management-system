import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Schools } from "./Schools";

@Index("Announcements_pkey", ["announcementId"], { unique: true })
@Entity("Announcements", { schema: "dbo" })
export class Announcements {
  @PrimaryGeneratedColumn({ type: "bigint", name: "AnnouncementId" })
  announcementId: string;

  @Column("character varying", { name: "AnnouncementCode", nullable: true })
  announcementCode: string | null;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("timestamp with time zone", {
    name: "TargetDate",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  targetDate: Date;

  @Column("character varying", { name: "TargetType" })
  targetType: string;

  @Column("varchar", { name: "TargetIds", array: true })
  targetIds: string[];

  @Column("boolean", { name: "Scheduled", default: () => "false" })
  scheduled: boolean;

  @Column("timestamp with time zone", {
    name: "CreatedDate",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  createdDate: Date;

  @Column("timestamp with time zone", { name: "UpdatedDate", nullable: true })
  updatedDate: Date | null;

  @Column("boolean", { name: "Draft", default: () => "false" })
  draft: boolean;

  @Column("boolean", { name: "Sent", default: () => "false" })
  sent: boolean;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Users, (users) => users.announcements)
  @JoinColumn([{ name: "CreatedByUserId", referencedColumnName: "userId" }])
  createdByUser: Users;

  @ManyToOne(() => Schools, (schools) => schools.announcements)
  @JoinColumn([{ name: "SchoolId", referencedColumnName: "schoolId" }])
  school: Schools;

  @ManyToOne(() => Users, (users) => users.announcements2)
  @JoinColumn([{ name: "UpdatedByUserId", referencedColumnName: "userId" }])
  updatedByUser: Users;
}
