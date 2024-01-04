import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Schools } from "./Schools";
import { EmployeeUser } from "./EmployeeUser";

@Index("EmployeeRoles_pkey", ["employeeRoleId"], { unique: true })
@Entity("EmployeeRoles", { schema: "dbo" })
export class EmployeeRoles {
  @PrimaryGeneratedColumn({ type: "bigint", name: "EmployeeRoleId" })
  employeeRoleId: string;

  @Column("character varying", { name: "EmployeeRoleCode", nullable: true })
  employeeRoleCode: string | null;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("json", { name: "EmployeeRoleAccess", default: [] })
  employeeRoleAccess: object;

  @Column("timestamp with time zone", {
    name: "CreatedDate",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  createdDate: Date;

  @Column("timestamp with time zone", { name: "UpdatedDate", nullable: true })
  updatedDate: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Users, (users) => users.employeeRoles)
  @JoinColumn([{ name: "CreatedByUserId", referencedColumnName: "userId" }])
  createdByUser: Users;

  @ManyToOne(() => Schools, (schools) => schools.employeeRoles)
  @JoinColumn([{ name: "SchoolId", referencedColumnName: "schoolId" }])
  school: Schools;

  @ManyToOne(() => Users, (users) => users.employeeRoles2)
  @JoinColumn([{ name: "UpdatedByUserId", referencedColumnName: "userId" }])
  updatedByUser: Users;

  @OneToMany(() => EmployeeUser, (employeeUser) => employeeUser.employeeRole)
  employeeUsers: EmployeeUser[];
}
