import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Employees } from "./Employees";
import { EmployeeRoles } from "./EmployeeRoles";
import { Users } from "./Users";

@Index("u_Employee", ["employeeId"], { unique: true })
@Index("EmployeeUser_pkey", ["employeeId", "userId"], { unique: true })
@Entity("EmployeeUser", { schema: "dbo" })
export class EmployeeUser {
  @Column("bigint", { primary: true, name: "EmployeeId" })
  employeeId: string;

  @Column("bigint", { primary: true, name: "UserId" })
  userId: string;

  @Column("timestamp with time zone", {
    name: "DateRegistered",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  dateRegistered: Date;

  @OneToOne(() => Employees, (employees) => employees.employeeUser)
  @JoinColumn([{ name: "EmployeeId", referencedColumnName: "employeeId" }])
  employee: Employees;

  @ManyToOne(
    () => EmployeeRoles,
    (employeeRoles) => employeeRoles.employeeUsers
  )
  @JoinColumn([
    { name: "EmployeeRoleId", referencedColumnName: "employeeRoleId" },
  ])
  employeeRole: EmployeeRoles;

  @ManyToOne(() => Users, (users) => users.employeeUsers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;
}
