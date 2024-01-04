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
import { Employees } from "./Employees";

@Index("EmployeeTitles_pkey", ["employeeTitleId"], { unique: true })
@Entity("EmployeeTitles", { schema: "dbo" })
export class EmployeeTitles {
  @PrimaryGeneratedColumn({ type: "bigint", name: "EmployeeTitleId" })
  employeeTitleId: string;

  @Column("character varying", { name: "EmployeeTitleCode", nullable: true })
  employeeTitleCode: string | null;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("timestamp with time zone", {
    name: "CreatedDate",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  createdDate: Date;

  @Column("timestamp with time zone", { name: "UpdatedDate", nullable: true })
  updatedDate: Date | null;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Users, (users) => users.employeeTitles)
  @JoinColumn([{ name: "CreatedByUserId", referencedColumnName: "userId" }])
  createdByUser: Users;

  @ManyToOne(() => Schools, (schools) => schools.employeeTitles)
  @JoinColumn([{ name: "SchoolId", referencedColumnName: "schoolId" }])
  school: Schools;

  @ManyToOne(() => Users, (users) => users.employeeTitles2)
  @JoinColumn([{ name: "UpdatedByUserId", referencedColumnName: "userId" }])
  updatedByUser: Users;

  @OneToMany(() => Employees, (employees) => employees.employeePosition)
  employees: Employees[];
}
