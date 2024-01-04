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
import { Repository, EntityManager } from "typeorm";
import { PusherService } from "./pusher.service";
import { Machines } from "src/db/entities/Machines";
import { MACHINES_ERROR_NOT_FOUND } from "src/common/constant/machines.constant";
import { FirebaseCloudMessagingService } from "./firebase-cloud-messaging.service";
import { DateConstant } from "src/common/constant/date.constant";
import { UserOneSignalSubscription } from "src/db/entities/UserOneSignalSubscription";
import { OneSignalNotificationService } from "./one-signal-notification.service";

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
          student: {
            parentStudents: true,
          },
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
      tl."StudentId" AS "studentId",  
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
      LEFT JOIN dbo."ParentStudent" ps ON tl."StudentId" = ps."StudentId"
      LEFT JOIN dbo."Students" s ON ps."StudentId" = s."StudentId"
      LEFT JOIN dbo."Parents" p ON ps."ParentId" = ps."ParentId"
      WHERE tl."Date" = '${date}'
      AND p."ParentCode" = '${parentCode}'
      GROUP BY tl."StudentId"
      ORDER BY tl."StudentId"
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
      LEFT JOIN dbo."Students" s ON tl."StudentId" = s."StudentId"
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
        student: {
          parentStudents: true,
          school: true,
        },
        machine: true,
      },
    });
    if (!result) {
      throw Error(TAPLOGS_ERROR_NOT_FOUND);
    }
    return result;
  }

  async create(dto: CreateTapLogDto) {
    return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
      const date = moment(dto.date, DateConstant.DATE_LANGUAGE).format(
        "YYYY-MM-DD"
      );
      const longDate = moment(dto.date, DateConstant.DATE_LANGUAGE).format(
        "MMM DD, YYYY"
      );
      let tapLog = await entityManager.findOne(TapLogs, {
        where: {
          date,
          status: dto.status,
          student: {
            cardNumber: dto.cardNumber,
          },
          time: dto.time.toUpperCase(),
        },
      });
      if (!tapLog) {
        tapLog = new TapLogs();

        tapLog.date = date;
        tapLog.time = dto.time;
        tapLog.status = dto.status;
        const student = await entityManager.findOne(Students, {
          where: {
            cardNumber: dto.cardNumber,
            active: true,
          },
        });
        if (!student) {
          throw Error(STUDENTS_ERROR_NOT_FOUND);
        }
        tapLog.student = student;
        const machine = await entityManager.findOne(Machines, {
          where: {
            description: dto.sender,
            active: true,
          },
        });
        if (!machine) {
          throw Error(MACHINES_ERROR_NOT_FOUND);
        }
        tapLog.machine = machine;

        tapLog = await entityManager.save(TapLogs, tapLog);

        const parentStudents = await entityManager.find(ParentStudent, {
          where: {
            student: {
              studentId: student.studentId,
            },
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

        // const userFireBase: UserFirebaseToken[] = [];
        // for (const parentStudent of parentStudents) {
        //   if (
        //     parentStudent.parent &&
        //     parentStudent.parent.user &&
        //     parentStudent.parent.user.userFirebaseTokens
        //   ) {
        //     for (const userFirebaseToken of parentStudent.parent.user
        //       .userFirebaseTokens) {
        //       if (
        //         !userFireBase.some(
        //           (x) => x.firebaseToken === userFirebaseToken.firebaseToken
        //         )
        //       ) {
        //         userFireBase.push(userFirebaseToken);
        //       }
        //     }
        //   }
        // }

        // if (userFireBase.length > 0) {
        //   const title = student?.fullName;
        //   let desc;
        //   if (dto.status === "LOG IN") {
        //     desc = `Your child, ${student?.fullName} has arrived in the school at ${dto.time}`;
        //   } else {
        //     desc = `Your child, ${student?.fullName} has left the school premises at ${dto.time}`;
        //   }

        //   const sendToDeviceCalls = [];
        //   for (const token of userFireBase) {
        //     if (token.firebaseToken && token.firebaseToken !== "") {
        //       sendToDeviceCalls.push(
        //         this.firebaseCloudMessagingService.firebaseSendToDevice(
        //           token.firebaseToken,
        //           title,
        //           desc
        //         )
        //       );
        //     }
        //   }
        //   await Promise.all(sendToDeviceCalls);

        const subscriptions = [];
        for (const parentStudent of parentStudents) {
          if (
            parentStudent.parent &&
            parentStudent.parent.user &&
            parentStudent.parent.user.userOneSignalSubscriptions
          ) {
            for (const subscription of parentStudent.parent.user
              .userOneSignalSubscriptions) {
              if (
                !subscriptions.some((x) => x === subscription.subscriptionId)
              ) {
                subscriptions.push(subscription.subscriptionId);
              }
            }
          }
        }

        if (subscriptions.length > 0) {
          const title = student?.fullName;
          let desc;
          if (dto.status.toUpperCase() === "LOG IN") {
            desc = `Your child, ${student?.fullName} has arrived in the school on ${longDate} at ${dto.time}`;
          } else {
            desc = `Your child, ${student?.fullName} has left the school premises on ${longDate} at ${dto.time}`;
          }

          await this.oneSignalNotificationService.sendToSubscriber(
            subscriptions,
            NOTIF_TYPE.STUDENT_LOG.toString(),
            tapLog.tapLogId,
            title,
            desc
          );
          await this.logNotification(
            parentStudents.map((x) => x.parent.user),
            tapLog.tapLogId,
            entityManager,
            title,
            desc
          );
        }
      }
      return tapLog;
    });
  }

  async createBatch(dtos: CreateTapLogDto[]) {
    return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
      const tapLogs = [];
      for (const dto of dtos) {
        const date = moment(dto.date, DateConstant.DATE_LANGUAGE).format(
          "YYYY-MM-DD"
        );
        const longDate = moment(dto.date, DateConstant.DATE_LANGUAGE).format(
          "MMM DD, YYYY"
        );
        let tapLog = await entityManager.findOne(TapLogs, {
          where: {
            date,
            time: dto.time.toUpperCase(),
          },
        });
        if (!tapLog) {
          tapLog = new TapLogs();

          tapLog.date = date;
          tapLog.time = dto.time;
          tapLog.status = dto.status;
          const student = await entityManager.findOne(Students, {
            where: {
              cardNumber: dto.cardNumber,
              active: true,
            },
          });
          if (student) {
            tapLog.student = student;
            const machine = await entityManager.findOne(Machines, {
              where: {
                description: dto.sender,
                active: true,
              },
            });
            if (!machine) {
              throw Error(MACHINES_ERROR_NOT_FOUND);
            }
            tapLog.machine = machine;

            tapLog = await entityManager.save(TapLogs, tapLog);

            const parentStudents = await entityManager.find(ParentStudent, {
              where: {
                student: {
                  studentId: student.studentId,
                },
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

            // const userFireBase: UserFirebaseToken[] = [];
            // for (const parentStudent of parentStudents) {
            //   if (
            //     parentStudent.parent &&
            //     parentStudent.parent.user &&
            //     parentStudent.parent.user.userFirebaseTokens
            //   ) {
            //     for (const userFirebaseToken of parentStudent.parent.user
            //       .userFirebaseTokens) {
            //       if (
            //         !userFireBase.some(
            //           (x) => x.firebaseToken === userFirebaseToken.firebaseToken
            //         )
            //       ) {
            //         userFireBase.push(userFirebaseToken);
            //       }
            //     }
            //   }
            // }

            // if (userFireBase.length > 0) {
            //   const title = student?.fullName;
            //   let desc;
            //   if (dto.status === "LOG IN") {
            //     desc = `Your child, ${student?.fullName} has arrived in the school at ${dto.time}`;
            //   } else {
            //     desc = `Your child, ${student?.fullName} has left the school premises at ${dto.time}`;
            //   }

            //   userFireBase.forEach(async (x) => {
            //     if (x.firebaseToken && x.firebaseToken !== "") {
            //       const res =
            //         await this.firebaseCloudMessagingService.sendToDevice(
            //           x.firebaseToken,
            //           title,
            //           desc
            //         );
            //       console.log(res);
            //     }
            //   });
            //   await this.logNotification(
            //     parentStudents.map((x) => x.parent.user),
            //     tapLog.tapLogId,
            //     entityManager,
            //     title,
            //     desc
            //   );
            // }

            const subscriptions = [];
            for (const parentStudent of parentStudents) {
              if (
                parentStudent.parent &&
                parentStudent.parent.user &&
                parentStudent.parent.user.userOneSignalSubscriptions
              ) {
                for (const subscription of parentStudent.parent.user
                  .userOneSignalSubscriptions) {
                  if (
                    !subscriptions.some(
                      (x) => x === subscription.subscriptionId
                    )
                  ) {
                    subscriptions.push(subscription.subscriptionId);
                  }
                }
              }
            }

            if (subscriptions.length > 0) {
              const title = student?.fullName;
              let desc;
              if (dto.status.toUpperCase() === "LOG IN") {
                desc = `Your child, ${student?.fullName} has arrived in the school on ${longDate} at ${dto.time}`;
              } else {
                desc = `Your child, ${student?.fullName} has left the school premises on ${longDate} at ${dto.time}`;
              }

              await this.oneSignalNotificationService.sendToSubscriber(
                subscriptions,
                NOTIF_TYPE.STUDENT_LOG.toString(),
                tapLog.tapLogId,
                title,
                desc
              );
              await this.logNotification(
                parentStudents.map((x) => x.parent.user),
                tapLog.tapLogId,
                entityManager,
                title,
                desc
              );
            }
          }
          tapLogs.push({
            refId: dto.refId,
            ...tapLog,
          });
        }
      }
      return tapLogs;
    });
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
    await entityManager.save(Notifications, notifcations);
    await this.pusherService.sendNotif(
      users.map((x) => x.userId),
      title,
      description
    );
  }
}
