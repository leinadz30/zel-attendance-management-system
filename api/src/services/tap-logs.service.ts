import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessagingDevicesResponse } from "firebase-admin/lib/messaging/messaging-api";
import moment from "moment";
import { LINKSTUDENTREQUEST_ERROR_NOT_FOUND } from "src/common/constant/link-student-request.constant";
import {
  NOTIF_TITLE,
  NOTIF_TYPE,
} from "src/common/constant/notifications.constant";
import { PARENTS_ERROR_NOT_FOUND } from "src/common/constant/parents.constant";
import { SCHOOLS_ERROR_NOT_FOUND } from "src/common/constant/schools.constant";
import { STUDENTS_ERROR_NOT_FOUND } from "src/common/constant/students.constant";
import { CONST_QUERYCURRENT_TIMESTAMP } from "src/common/constant/timestamp.constant";
import { TAPLOGS_ERROR_NOT_FOUND } from "src/common/constant/top-logs.constant";
import { USER_ERROR_USER_NOT_FOUND } from "src/common/constant/user-error.constant";
import {
  columnDefToTypeORMCondition,
  generateIndentityCode,
} from "src/common/utils/utils";
import { CreateTapLogDto } from "src/core/dto/tap-logs/tap-logs.create.dto";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { Notifications } from "src/db/entities/Notifications";
import { ParentStudent } from "src/db/entities/ParentStudent";
import { Parents } from "src/db/entities/Parents";
import { Schools } from "src/db/entities/Schools";
import { Students } from "src/db/entities/Students";
import { TapLogs } from "src/db/entities/TapLogs";
import { UserFirebaseToken } from "src/db/entities/UserFirebaseToken";
import { Users } from "src/db/entities/Users";
import { Repository, EntityManager, In } from "typeorm";
import { PusherService } from "./pusher.service";
import { Machines } from "src/db/entities/Machines";
import { MACHINES_ERROR_NOT_FOUND } from "src/common/constant/machines.constant";
import { FirebaseCloudMessagingService } from "./firebase-cloud-messaging.service";
import { DateConstant } from "src/common/constant/date.constant";
import { UserOneSignalSubscription } from "src/db/entities/UserOneSignalSubscription";
import { OneSignalNotificationService } from "./one-signal-notification.service";
import { Employees } from "src/db/entities/Employees";
import { EMPLOYEEROLES_ERROR_NOT_FOUND } from "src/common/constant/employees-roles.constant";
import { User } from "@firebase/auth";

@Injectable()
export class TapLogsService {
  constructor(
    @InjectRepository(TapLogs)
    private readonly tapLogsRepo: Repository<TapLogs>,
    private pusherService: PusherService,
    private firebaseProvoder: FirebaseProvider,
    private firebaseCloudMessagingService: FirebaseCloudMessagingService,
    private oneSignalNotificationService: OneSignalNotificationService
  ) {}
  async getPagination({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    const condition = columnDefToTypeORMCondition(columnDef);
    const [results, total] = await Promise.all([
      this.tapLogsRepo.find({
        where: condition,
        relations: {
          machine: true,
        },
        skip,
        take,
        order,
      }),
      this.tapLogsRepo.count({
        where: condition,
      }),
    ]);
    return {
      results,
      total,
    };
  }

  async getStudentsTapsByParentCode(parentCode, date) {
    date = moment(date).format("YYYY-MM-DD");
    const res: any[] = await this.tapLogsRepo.manager.query(`
      Select 
      s."StudentId" AS "studentId",  
      MAX(s."StudentCode") AS "studentCode",
      MAX(s."FirstName") AS "firstName",
      MAX(s."MiddleInitial") AS "middleInitial",
      MAX(s."LastName") AS "lastName",
      MAX(s."CardNumber") AS "cardNumber",
      MAX(s."MobileNumber") AS "mobileNumber",
      MAX(s."Email") AS "email",
      MAX(s."Address") AS "address",
      MAX(s."RegistrationDate") AS "registrationDate",
      MAX(s."FullName") AS "fullName",
      array_to_json(array_agg(t)) AS "logs" from (
        select "TapLogId" as "tapLogId", "Status" as "status", "Time" as "time",
        ((CONCAT("Date",' ',"Time")::timestamp WITH TIME ZONE AT TIME ZONE 'Asia/Manila') AT TIME ZONE 'Asia/Manila'::text) as "dateTime" 
        from dbo."TapLogs"
      ) t 
      LEFT JOIN dbo."TapLogs" tl ON t."tapLogId" = tl."TapLogId"
      LEFT JOIN dbo."Students" s ON tl."CardNumber" = s."CardNumber"
      LEFT JOIN dbo."ParentStudent" ps ON s."StudentId" = ps."StudentId"
      LEFT JOIN dbo."Parents" p ON ps."ParentId" = p."ParentId"
      WHERE tl."Date" = '${date}'
      AND p."ParentCode" = '${parentCode}'
      GROUP BY s."StudentId"
      ORDER BY s."StudentId"
    `);
    return res.map((x) => {
      x.logs.sort((a, b) => {
        return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      });
      const log = x.logs.length > 1 ? x.logs[x.logs.length - 1] : x.logs[0];
      x.status = log.status;
      x.recentTapTime = log.time;
      x.arrivedTime = x.logs[0].time;
      return x;
    });
  }

  async getStudentsTapsByStudentCode(studentCode, date) {
    date = moment(date).format("YYYY-MM-DD");
    const res: TapLogs[] = await this.tapLogsRepo.manager.query(`
      Select 
      tl."TapLogId" AS "tapLogId",
      tl."Status" AS "status",
      tl."Time" AS "time",
      t."DateTime" AS "date"
      from (
      select "TapLogId" as "tapLogId",
      ((CONCAT("Date",' ',"Time")::timestamp WITH TIME ZONE AT TIME ZONE 'Asia/Manila') AT TIME ZONE 'Asia/Manila'::text) as "DateTime" 
      from dbo."TapLogs"
      ) t 
      LEFT JOIN dbo."TapLogs" tl ON t."tapLogId" = tl."TapLogId"
      LEFT JOIN dbo."Students" s ON tl."CardNumber" = s."CardNumber"
      WHERE s."StudentCode" = '${studentCode}'
      AND tl."Date" = '${date}'
      ORDER BY t."DateTime" ASC
    `);
    return res;
  }

  async getById(tapLogId) {
    const result = await this.tapLogsRepo.findOne({
      where: {
        tapLogId,
      },
      relations: {
        machine: true,
      },
    });
    if (!result) {
      throw Error(TAPLOGS_ERROR_NOT_FOUND);
    } else {
      if (result.type === "STUDENT") {
        return {
          ...result,
          student: await this.tapLogsRepo.manager.findOne(Students, {
            where: { cardNumber: result.cardNumber },
            relations: {
              school: true,
              department: true,
              parentStudents: {
                parent: true,
              },
              studentStrand: {
                strand: true,
              },
              studentSection: {
                section: true,
              },
              studentCourse: {
                course: true,
              },
              schoolYearLevel: {
                school: true,
              },
            },
          }),
        };
      } else {
        return {
          ...result,
          employee: this.tapLogsRepo.manager.findOne(Employees, {
            where: {
              cardNumber: result.cardNumber,
              active: true,
            },
            relations: {
              department: true,
              createdByUser: true,
              updatedByUser: true,
              school: true,
              employeePosition: true,
              employeeUser: {
                user: true,
                employeeRole: true,
              },
            },
          }),
        };
      }
    }
  }

  async create(dto: CreateTapLogDto) {
    return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
      const date = moment(
        new Date(dto.date),
        DateConstant.DATE_LANGUAGE
      ).format("YYYY-MM-DD");
      const longDate = moment(
        new Date(dto.date),
        DateConstant.DATE_LANGUAGE
      ).format("MMM DD, YYYY");
      const { cardNumber, status, time, sender } = dto;
      let tapLog: TapLogs;
      tapLog = await entityManager.findOne(TapLogs, {
        where: {
          date,
          cardNumber,
          status,
          time: time.toUpperCase(),
        },
      });
      if (!tapLog) {
        tapLog = new TapLogs();
        tapLog.date = date;
        tapLog.cardNumber = cardNumber;
        tapLog.time = dto.time;
        tapLog.status = dto.status;
        tapLog.type = dto.userType;
        const machine = await entityManager.findOne(Machines, {
          where: {
            description: sender,
            active: true,
          },
        });
        if (!machine) {
          throw Error(MACHINES_ERROR_NOT_FOUND);
        }
        tapLog.machine = machine;
        tapLog = await entityManager.save(TapLogs, tapLog);

        const userToNotify: Users[] = [];
        let title;
        let desc;
        let type;
        if (dto.userType === "STUDENT") {
          const student = await entityManager.findOne(Students, {
            where: { cardNumber },
          });

          const { studentId, fullName } = student;
          title = fullName;
          desc =
            dto.status.toUpperCase() === "LOG IN"
              ? `Your child, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
              : `Your child, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
          type = NOTIF_TYPE.STUDENT_LOG.toString();
          const parentStudents = await entityManager.find(ParentStudent, {
            where: {
              student: { studentId },
            },
            relations: {
              parent: {
                user: {
                  userFirebaseTokens: true,
                  userOneSignalSubscriptions: true,
                },
              },
            },
          });

          for (const parentStudent of parentStudents) {
            if (
              parentStudent.parent &&
              parentStudent.parent.user &&
              parentStudent.parent.user.userOneSignalSubscriptions
            ) {
              if (
                !userToNotify.some(
                  (x) => x.userId === parentStudent.parent.user.userId
                )
              ) {
                userToNotify.push(parentStudent.parent.user);
              }
            }
          }
        } else {
          const employee = await entityManager.findOne(Employees, {
            where: { cardNumber },
            relations: {
              employeeUser: {
                user: true,
              },
            },
          });
          const { employeeUser, fullName } = employee;
          title = fullName;
          desc =
            dto.status.toUpperCase() === "LOG IN"
              ? `Employee tap activity, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
              : `Employee tap activity, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
          type = NOTIF_TYPE.EMPLOYEET_LOG.toString();
          userToNotify.push(employeeUser.user);
        }

        tapLog = await entityManager.findOne(TapLogs, {
          where: {
            tapLogId: tapLog.tapLogId,
          },
          relations: {
            machine: true,
          },
        });

        const notificationIds = await this.logNotification(
          userToNotify,
          tapLog.tapLogId,
          entityManager,
          title,
          desc
        );
        const massRequest = [];
        for (const user of userToNotify) {
          massRequest.push(
            this.oneSignalNotificationService.sendToExternalUser(
              user.userName,
              NOTIF_TYPE.LINK_REQUEST.toString(),
              tapLog.tapLogId,
              notificationIds,
              title,
              desc
            )
          );
        }
        const results: { userId: string; success: boolean }[] =
          await Promise.all(massRequest);
        console.log("Notify to user results ", JSON.stringify(results));
      }
      return tapLog;
    });
  }

  async createBatch(dtos: CreateTapLogDto[]) {
    try {
      return await this.tapLogsRepo.manager.transaction(
        async (entityManager) => {
          const success = [];
          const duplicates = [];
          const failed = [];
          for (const dto of dtos) {
            try {
              const date = moment(
                new Date(dto.date),
                DateConstant.DATE_LANGUAGE
              ).format("YYYY-MM-DD");
              const longDate = moment(
                new Date(dto.date),
                DateConstant.DATE_LANGUAGE
              ).format("MMM DD, YYYY");
              const { cardNumber, status, time, sender } = dto;
              let tapLog: TapLogs;
              tapLog = await entityManager.findOne(TapLogs, {
                where: {
                  date,
                  cardNumber,
                  status,
                  time: time.toUpperCase(),
                },
              });
              if (!tapLog) {
                tapLog = new TapLogs();
                tapLog.date = date;
                tapLog.cardNumber = cardNumber;
                tapLog.time = dto.time;
                tapLog.status = dto.status;
                tapLog.type = dto.userType;
                const machine = await entityManager.findOne(Machines, {
                  where: {
                    description: sender,
                    active: true,
                  },
                });
                if (!machine) {
                  throw Error(MACHINES_ERROR_NOT_FOUND);
                }
                tapLog.machine = machine;
                tapLog = await entityManager.save(TapLogs, tapLog);

                const userToNotify: Users[] = [];
                let title;
                let desc;
                let type;
                if (dto.userType === "STUDENT") {
                  const student = await entityManager.findOne(Students, {
                    where: { cardNumber },
                  });

                  const { studentId, fullName } = student;
                  title = fullName;
                  desc =
                    dto.status.toUpperCase() === "LOG IN"
                      ? `Your child, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
                      : `Your child, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
                  type = NOTIF_TYPE.STUDENT_LOG.toString();
                  const parentStudents = await entityManager.find(
                    ParentStudent,
                    {
                      where: {
                        student: { studentId },
                      },
                      relations: {
                        parent: {
                          user: {
                            userFirebaseTokens: true,
                            userOneSignalSubscriptions: true,
                          },
                        },
                      },
                    }
                  );

                  for (const parentStudent of parentStudents) {
                    if (
                      parentStudent.parent &&
                      parentStudent.parent.user &&
                      parentStudent.parent.user.userOneSignalSubscriptions
                    ) {
                      if (
                        !userToNotify.some(
                          (x) => x.userId === parentStudent.parent.user.userId
                        )
                      ) {
                        userToNotify.push(parentStudent.parent.user);
                      }
                    }
                  }
                } else {
                  const employee = await entityManager.findOne(Employees, {
                    where: { cardNumber },
                    relations: {
                      employeeUser: {
                        user: true,
                      },
                    },
                  });
                  const { employeeUser, fullName } = employee;
                  title = fullName;
                  desc =
                    dto.status.toUpperCase() === "LOG IN"
                      ? `Employee tap activity, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
                      : `Employee tap activity, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
                  type = NOTIF_TYPE.EMPLOYEET_LOG.toString();
                  userToNotify.push(employeeUser.user);
                }

                tapLog = await entityManager.findOne(TapLogs, {
                  where: {
                    tapLogId: tapLog.tapLogId,
                  },
                  relations: {
                    machine: true,
                  },
                });

                const notificationIds = await this.logNotification(
                  userToNotify,
                  tapLog.tapLogId,
                  entityManager,
                  title,
                  desc
                );
                const massRequest = [];
                for (const user of userToNotify) {
                  massRequest.push(
                    this.oneSignalNotificationService.sendToExternalUser(
                      user.userName,
                      NOTIF_TYPE.LINK_REQUEST.toString(),
                      tapLog.tapLogId,
                      notificationIds,
                      title,
                      desc
                    )
                  );
                }
                const results: { userId: string; success: boolean }[] =
                  await Promise.all(massRequest);
                console.log("Notify to user results ", JSON.stringify(results));
              }
              success.push({
                cardNumber: dto.cardNumber,
                refId: dto.refId,
              });
            } catch (ex) {
              failed.push({
                cardNumber: dto.cardNumber,
                refId: dto.refId,
                comments: ex?.message,
              });
            }
          }
          return {
            success,
            duplicates,
            failed,
          };
        }
      );
    } catch (ex) {
      throw ex;
    }
  }

  async logNotification(
    users: Users[],
    referenceId,
    entityManager: EntityManager,
    title: string,
    description: string
  ) {
    const notifcations = [];

    const timestamp = await entityManager
      .query(CONST_QUERYCURRENT_TIMESTAMP)
      .then((res) => {
        return res[0]["timestamp"];
      });
    users.forEach((x) => {
      notifcations.push({
        dateTime: timestamp,
        title,
        description,
        type: NOTIF_TYPE.STUDENT_LOG.toString(),
        referenceId,
        isRead: false,
        forUser: x,
      });
    });
    const res: any[] = await entityManager.save(Notifications, notifcations);
    const notificationsIds = res.map((x) => x.notificationId);
    await this.pusherService.sendNotif(
      users.map((x) => x.userId),
      notificationsIds,
      referenceId,
      NOTIF_TYPE.STUDENT_LOG.toString() as any,
      title,
      description
    );
    return notificationsIds;
  }
}
