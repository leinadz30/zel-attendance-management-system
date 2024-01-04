"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TapLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const notifications_constant_1 = require("../common/constant/notifications.constant");
const students_constant_1 = require("../common/constant/students.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const top_logs_constant_1 = require("../common/constant/top-logs.constant");
const utils_1 = require("../common/utils/utils");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const Notifications_1 = require("../db/entities/Notifications");
const ParentStudent_1 = require("../db/entities/ParentStudent");
const Students_1 = require("../db/entities/Students");
const TapLogs_1 = require("../db/entities/TapLogs");
const typeorm_2 = require("typeorm");
const pusher_service_1 = require("./pusher.service");
const Machines_1 = require("../db/entities/Machines");
const machines_constant_1 = require("../common/constant/machines.constant");
const firebase_cloud_messaging_service_1 = require("./firebase-cloud-messaging.service");
const date_constant_1 = require("../common/constant/date.constant");
const one_signal_notification_service_1 = require("./one-signal-notification.service");
let TapLogsService = class TapLogsService {
    constructor(tapLogsRepo, pusherService, firebaseProvoder, firebaseCloudMessagingService, oneSignalNotificationService) {
        this.tapLogsRepo = tapLogsRepo;
        this.pusherService = pusherService;
        this.firebaseProvoder = firebaseProvoder;
        this.firebaseCloudMessagingService = firebaseCloudMessagingService;
        this.oneSignalNotificationService = oneSignalNotificationService;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
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
        date = (0, moment_1.default)(date).format("YYYY-MM-DD");
        const res = await this.tapLogsRepo.manager.query(`
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
        date = (0, moment_1.default)(date).format("YYYY-MM-DD");
        const res = await this.tapLogsRepo.manager.query(`
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
            throw Error(top_logs_constant_1.TAPLOGS_ERROR_NOT_FOUND);
        }
        return result;
    }
    async create(dto) {
        return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
            const date = (0, moment_1.default)(dto.date, date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            const longDate = (0, moment_1.default)(dto.date, date_constant_1.DateConstant.DATE_LANGUAGE).format("MMM DD, YYYY");
            let tapLog = await entityManager.findOne(TapLogs_1.TapLogs, {
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
                tapLog = new TapLogs_1.TapLogs();
                tapLog.date = date;
                tapLog.time = dto.time;
                tapLog.status = dto.status;
                const student = await entityManager.findOne(Students_1.Students, {
                    where: {
                        cardNumber: dto.cardNumber,
                        active: true,
                    },
                });
                if (!student) {
                    throw Error(students_constant_1.STUDENTS_ERROR_NOT_FOUND);
                }
                tapLog.student = student;
                const machine = await entityManager.findOne(Machines_1.Machines, {
                    where: {
                        description: dto.sender,
                        active: true,
                    },
                });
                if (!machine) {
                    throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
                }
                tapLog.machine = machine;
                tapLog = await entityManager.save(TapLogs_1.TapLogs, tapLog);
                const parentStudents = await entityManager.find(ParentStudent_1.ParentStudent, {
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
                const subscriptions = [];
                for (const parentStudent of parentStudents) {
                    if (parentStudent.parent &&
                        parentStudent.parent.user &&
                        parentStudent.parent.user.userOneSignalSubscriptions) {
                        for (const subscription of parentStudent.parent.user
                            .userOneSignalSubscriptions) {
                            if (!subscriptions.some((x) => x === subscription.subscriptionId)) {
                                subscriptions.push(subscription.subscriptionId);
                            }
                        }
                    }
                }
                if (subscriptions.length > 0) {
                    const title = student === null || student === void 0 ? void 0 : student.fullName;
                    let desc;
                    if (dto.status.toUpperCase() === "LOG IN") {
                        desc = `Your child, ${student === null || student === void 0 ? void 0 : student.fullName} has arrived in the school on ${longDate} at ${dto.time}`;
                    }
                    else {
                        desc = `Your child, ${student === null || student === void 0 ? void 0 : student.fullName} has left the school premises on ${longDate} at ${dto.time}`;
                    }
                    const massRequest = [];
                    for (const subscription of subscriptions) {
                        massRequest.push(await this.oneSignalNotificationService.sendToSubscriber([subscription], notifications_constant_1.NOTIF_TYPE.STUDENT_LOG.toString(), tapLog.tapLogId, title, desc));
                    }
                    await Promise.all(massRequest);
                    await this.logNotification(parentStudents.map((x) => x.parent.user), tapLog.tapLogId, entityManager, title, desc);
                }
            }
            return tapLog;
        });
    }
    async createBatch(dtos) {
        return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
            const tapLogs = [];
            for (const dto of dtos) {
                const date = (0, moment_1.default)(dto.date, date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
                const longDate = (0, moment_1.default)(dto.date, date_constant_1.DateConstant.DATE_LANGUAGE).format("MMM DD, YYYY");
                let tapLog = await entityManager.findOne(TapLogs_1.TapLogs, {
                    where: {
                        date,
                        time: dto.time.toUpperCase(),
                    },
                });
                if (!tapLog) {
                    tapLog = new TapLogs_1.TapLogs();
                    tapLog.date = date;
                    tapLog.time = dto.time;
                    tapLog.status = dto.status;
                    const student = await entityManager.findOne(Students_1.Students, {
                        where: {
                            cardNumber: dto.cardNumber,
                            active: true,
                        },
                    });
                    if (student) {
                        tapLog.student = student;
                        const machine = await entityManager.findOne(Machines_1.Machines, {
                            where: {
                                description: dto.sender,
                                active: true,
                            },
                        });
                        if (!machine) {
                            throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
                        }
                        tapLog.machine = machine;
                        tapLog = await entityManager.save(TapLogs_1.TapLogs, tapLog);
                        const parentStudents = await entityManager.find(ParentStudent_1.ParentStudent, {
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
                        const subscriptions = [];
                        for (const parentStudent of parentStudents) {
                            if (parentStudent.parent &&
                                parentStudent.parent.user &&
                                parentStudent.parent.user.userOneSignalSubscriptions) {
                                for (const subscription of parentStudent.parent.user
                                    .userOneSignalSubscriptions) {
                                    if (!subscriptions.some((x) => x === subscription.subscriptionId)) {
                                        subscriptions.push(subscription.subscriptionId);
                                    }
                                }
                            }
                        }
                        if (subscriptions.length > 0) {
                            const title = student === null || student === void 0 ? void 0 : student.fullName;
                            let desc;
                            if (dto.status.toUpperCase() === "LOG IN") {
                                desc = `Your child, ${student === null || student === void 0 ? void 0 : student.fullName} has arrived in the school on ${longDate} at ${dto.time}`;
                            }
                            else {
                                desc = `Your child, ${student === null || student === void 0 ? void 0 : student.fullName} has left the school premises on ${longDate} at ${dto.time}`;
                            }
                            const massRequest = [];
                            for (const subscription of subscriptions) {
                                massRequest.push(await this.oneSignalNotificationService.sendToSubscriber([subscription], notifications_constant_1.NOTIF_TYPE.STUDENT_LOG.toString(), tapLog.tapLogId, title, desc));
                            }
                            await Promise.all(massRequest);
                            await this.logNotification(parentStudents.map((x) => x.parent.user), tapLog.tapLogId, entityManager, title, desc);
                        }
                    }
                    tapLogs.push(Object.assign({ refId: dto.refId }, tapLog));
                }
            }
            return tapLogs;
        });
    }
    async logNotification(users, referenceId, entityManager, title, description) {
        const notifcations = [];
        const timestamp = await entityManager
            .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
            .then((res) => {
            return res[0]["timestamp"];
        });
        users.forEach((x) => {
            notifcations.push({
                dateTime: timestamp,
                title,
                description,
                type: notifications_constant_1.NOTIF_TYPE.STUDENT_LOG.toString(),
                referenceId,
                isRead: false,
                forUser: x,
            });
        });
        await entityManager.save(Notifications_1.Notifications, notifcations);
        await this.pusherService.sendNotif(users.map((x) => x.userId), title, description);
    }
};
TapLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(TapLogs_1.TapLogs)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pusher_service_1.PusherService,
        firebase_provider_1.FirebaseProvider,
        firebase_cloud_messaging_service_1.FirebaseCloudMessagingService,
        one_signal_notification_service_1.OneSignalNotificationService])
], TapLogsService);
exports.TapLogsService = TapLogsService;
//# sourceMappingURL=tap-logs.service.js.map