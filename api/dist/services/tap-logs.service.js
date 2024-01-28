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
const Employees_1 = require("../db/entities/Employees");
const employees_roles_constant_1 = require("../common/constant/employees-roles.constant");
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
      ANd ps."Active" = true
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
            throw Error(top_logs_constant_1.TAPLOGS_ERROR_NOT_FOUND);
        }
        else {
            if (result.type === "STUDENT") {
                return Object.assign(Object.assign({}, result), { student: await this.tapLogsRepo.manager.findOne(Students_1.Students, {
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
                    }) });
            }
            else {
                return Object.assign(Object.assign({}, result), { employee: this.tapLogsRepo.manager.findOne(Employees_1.Employees, {
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
                    }) });
            }
        }
    }
    async create(dto) {
        return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
            const date = (0, moment_1.default)(new Date(dto.date), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
            const longDate = (0, moment_1.default)(new Date(dto.date), date_constant_1.DateConstant.DATE_LANGUAGE).format("MMM DD, YYYY");
            const { cardNumber, status, time, sender } = dto;
            let tapLog;
            tapLog = await entityManager.findOne(TapLogs_1.TapLogs, {
                where: {
                    date,
                    cardNumber,
                    status,
                    time: time.toUpperCase(),
                },
            });
            if (!tapLog) {
                tapLog = new TapLogs_1.TapLogs();
                tapLog.date = date;
                tapLog.cardNumber = cardNumber;
                tapLog.time = dto.time;
                tapLog.status = dto.status;
                tapLog.type = dto.userType;
                const machine = await entityManager.findOne(Machines_1.Machines, {
                    where: {
                        description: sender,
                        active: true,
                    },
                });
                if (!machine) {
                    throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
                }
                tapLog.machine = machine;
                tapLog = await entityManager.save(TapLogs_1.TapLogs, tapLog);
                const userToNotify = [];
                let title;
                let desc;
                let type;
                if (dto.userType === "STUDENT") {
                    const student = await entityManager.findOne(Students_1.Students, {
                        where: { cardNumber },
                    });
                    if (!student) {
                        throw Error(students_constant_1.STUDENTS_ERROR_NOT_FOUND);
                    }
                    const { studentId, fullName } = student;
                    title = fullName;
                    desc =
                        dto.status.toUpperCase() === "LOG IN"
                            ? `Your child, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
                            : `Your child, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
                    type = notifications_constant_1.NOTIF_TYPE.STUDENT_LOG.toString();
                    const parentStudents = await entityManager.find(ParentStudent_1.ParentStudent, {
                        where: {
                            student: { studentId },
                            active: true,
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
                        if (parentStudent.parent &&
                            parentStudent.parent.user &&
                            parentStudent.parent.user.userOneSignalSubscriptions) {
                            if (!userToNotify.some((x) => x.userId === parentStudent.parent.user.userId)) {
                                userToNotify.push(parentStudent.parent.user);
                            }
                        }
                    }
                }
                else {
                    const employee = await entityManager.findOne(Employees_1.Employees, {
                        where: { cardNumber },
                        relations: {
                            employeeUser: {
                                user: true,
                            },
                        },
                    });
                    if (!employee) {
                        throw Error(employees_roles_constant_1.EMPLOYEEROLES_ERROR_NOT_FOUND);
                    }
                    const { employeeUser, fullName } = employee;
                    title = fullName;
                    desc =
                        dto.status.toUpperCase() === "LOG IN"
                            ? `Employee tap activity, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
                            : `Employee tap activity, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
                    type = notifications_constant_1.NOTIF_TYPE.EMPLOYEET_LOG.toString();
                    userToNotify.push(employeeUser.user);
                }
                tapLog = await entityManager.findOne(TapLogs_1.TapLogs, {
                    where: {
                        tapLogId: tapLog.tapLogId,
                    },
                    relations: {
                        machine: true,
                    },
                });
                const notificationIds = await this.logNotification(userToNotify, tapLog.tapLogId, entityManager, title, desc);
                const massRequest = [];
                for (const user of userToNotify) {
                    massRequest.push(this.oneSignalNotificationService.sendToExternalUser(user.userName, type, tapLog.tapLogId, notificationIds, title, desc));
                }
                const results = await Promise.all(massRequest);
                console.log("Notify to user results ", JSON.stringify(results));
            }
            return tapLog;
        });
    }
    async createBatch(dtos) {
        try {
            return await this.tapLogsRepo.manager.transaction(async (entityManager) => {
                const success = [];
                const warning = [];
                const failed = [];
                for (const dto of dtos) {
                    try {
                        const date = (0, moment_1.default)(new Date(dto.date), date_constant_1.DateConstant.DATE_LANGUAGE).format("YYYY-MM-DD");
                        const longDate = (0, moment_1.default)(new Date(dto.date), date_constant_1.DateConstant.DATE_LANGUAGE).format("MMM DD, YYYY");
                        const { cardNumber, status, time, sender } = dto;
                        let tapLog;
                        tapLog = await entityManager.findOne(TapLogs_1.TapLogs, {
                            where: {
                                date,
                                cardNumber,
                                status,
                                time: time.toUpperCase(),
                            },
                        });
                        if (!tapLog) {
                            tapLog = new TapLogs_1.TapLogs();
                            tapLog.date = date;
                            tapLog.cardNumber = cardNumber;
                            tapLog.time = dto.time;
                            tapLog.status = dto.status;
                            tapLog.type = dto.userType;
                            const machine = await entityManager.findOne(Machines_1.Machines, {
                                where: {
                                    description: sender,
                                    active: true,
                                },
                            });
                            if (!machine) {
                                throw Error(machines_constant_1.MACHINES_ERROR_NOT_FOUND);
                            }
                            tapLog.machine = machine;
                            tapLog = await entityManager.save(TapLogs_1.TapLogs, tapLog);
                            const userToNotify = [];
                            let title;
                            let desc;
                            let type;
                            if (dto.userType === "STUDENT") {
                                const student = await entityManager.findOne(Students_1.Students, {
                                    where: { cardNumber },
                                });
                                if (!student) {
                                    throw Error(students_constant_1.STUDENTS_ERROR_NOT_FOUND);
                                }
                                const { studentId, fullName } = student;
                                title = fullName;
                                desc =
                                    dto.status.toUpperCase() === "LOG IN"
                                        ? `Your child, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
                                        : `Your child, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
                                type = notifications_constant_1.NOTIF_TYPE.STUDENT_LOG.toString();
                                const parentStudents = await entityManager.find(ParentStudent_1.ParentStudent, {
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
                                    if (parentStudent.parent &&
                                        parentStudent.parent.user &&
                                        parentStudent.parent.user.userOneSignalSubscriptions) {
                                        if (!userToNotify.some((x) => x.userId === parentStudent.parent.user.userId)) {
                                            userToNotify.push(parentStudent.parent.user);
                                        }
                                    }
                                }
                            }
                            else {
                                const employee = await entityManager.findOne(Employees_1.Employees, {
                                    where: { cardNumber },
                                    relations: {
                                        employeeUser: {
                                            user: true,
                                        },
                                    },
                                });
                                if (!employee) {
                                    throw Error(employees_roles_constant_1.EMPLOYEEROLES_ERROR_NOT_FOUND);
                                }
                                const { employeeUser, fullName } = employee;
                                title = fullName;
                                desc =
                                    dto.status.toUpperCase() === "LOG IN"
                                        ? `Employee tap activity, ${fullName} has arrived in the school on ${longDate} at ${dto.time}`
                                        : `Employee tap activity, ${fullName} has left the school premises on ${longDate} at ${dto.time}`;
                                type = notifications_constant_1.NOTIF_TYPE.EMPLOYEET_LOG.toString();
                                userToNotify.push(employeeUser.user);
                            }
                            tapLog = await entityManager.findOne(TapLogs_1.TapLogs, {
                                where: {
                                    tapLogId: tapLog.tapLogId,
                                },
                                relations: {
                                    machine: true,
                                },
                            });
                            const notificationIds = await this.logNotification(userToNotify, tapLog.tapLogId, entityManager, title, desc);
                            const massRequest = [];
                            for (const user of userToNotify) {
                                massRequest.push(this.oneSignalNotificationService.sendToExternalUser(user.userName, type, tapLog.tapLogId, notificationIds, title, desc));
                            }
                            const results = await Promise.all(massRequest);
                            console.log("Notify to user results ", JSON.stringify(results));
                        }
                        success.push({
                            cardNumber: dto.cardNumber,
                            refId: dto.refId,
                        });
                    }
                    catch (ex) {
                        failed.push({
                            cardNumber: dto.cardNumber,
                            refId: dto.refId,
                            comments: ex === null || ex === void 0 ? void 0 : ex.message,
                        });
                    }
                }
                return {
                    success,
                    warning,
                    failed,
                };
            });
        }
        catch (ex) {
            throw ex;
        }
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
        const res = await entityManager.save(Notifications_1.Notifications, notifcations);
        const notificationsIds = res.map((x) => x.notificationId);
        await this.pusherService.sendNotif(users.map((x) => x.userId), notificationsIds, referenceId, notifications_constant_1.NOTIF_TYPE.STUDENT_LOG.toString(), title, description);
        return notificationsIds;
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