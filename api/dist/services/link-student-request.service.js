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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkStudentRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const link_student_request_constant_1 = require("../common/constant/link-student-request.constant");
const notifications_constant_1 = require("../common/constant/notifications.constant");
const schools_constant_1 = require("../common/constant/schools.constant");
const timestamp_constant_1 = require("../common/constant/timestamp.constant");
const user_error_constant_1 = require("../common/constant/user-error.constant");
const utils_1 = require("../common/utils/utils");
const LinkStudentRequest_1 = require("../db/entities/LinkStudentRequest");
const Notifications_1 = require("../db/entities/Notifications");
const Schools_1 = require("../db/entities/Schools");
const Students_1 = require("../db/entities/Students");
const Users_1 = require("../db/entities/Users");
const typeorm_2 = require("typeorm");
const pusher_service_1 = require("./pusher.service");
const Parents_1 = require("../db/entities/Parents");
const ParentStudent_1 = require("../db/entities/ParentStudent");
const parents_constant_1 = require("../common/constant/parents.constant");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const one_signal_notification_service_1 = require("./one-signal-notification.service");
const UserOneSignalSubscription_1 = require("../db/entities/UserOneSignalSubscription");
let LinkStudentRequestService = class LinkStudentRequestService {
    constructor(linkStudentRequestRepo, pusherService, firebaseProvoder, oneSignalNotificationService) {
        this.linkStudentRequestRepo = linkStudentRequestRepo;
        this.pusherService = pusherService;
        this.firebaseProvoder = firebaseProvoder;
        this.oneSignalNotificationService = oneSignalNotificationService;
    }
    async getPagination({ pageSize, pageIndex, order, columnDef }) {
        const skip = Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
        const take = Number(pageSize);
        const condition = (0, utils_1.columnDefToTypeORMCondition)(columnDef);
        const [results, total] = await Promise.all([
            this.linkStudentRequestRepo.find({
                where: condition,
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: true,
                    updatedByUser: true,
                },
                skip,
                take,
                order,
            }),
            this.linkStudentRequestRepo.count({
                where: condition,
            }),
        ]);
        return {
            results: results.map((x) => {
                var _a;
                if ((_a = x === null || x === void 0 ? void 0 : x.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
                    delete x.updatedByUser.password;
                }
                return x;
            }),
            total,
        };
    }
    async getByCode(linkStudentRequestCode) {
        var _a;
        const result = await this.linkStudentRequestRepo.findOne({
            where: {
                linkStudentRequestCode,
            },
            relations: {
                student: true,
                school: true,
                requestedByParent: true,
                updatedByUser: true,
            },
        });
        if (!result) {
            throw Error(link_student_request_constant_1.LINKSTUDENTREQUEST_ERROR_NOT_FOUND);
        }
        if ((_a = result === null || result === void 0 ? void 0 : result.updatedByUser) === null || _a === void 0 ? void 0 : _a.password) {
            delete result.updatedByUser.password;
        }
        return result;
    }
    async create(dto) {
        return await this.linkStudentRequestRepo.manager.transaction(async (entityManager) => {
            let linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    requestedByParent: {
                        parentId: dto.requestedByParentId,
                    },
                    student: {
                        studentId: dto.studentId,
                    },
                    status: "PENDING",
                },
                relations: {
                    requestedByParent: true,
                    student: true,
                },
            });
            if (linkStudentRequest) {
                throw Error("A request to link " +
                    linkStudentRequest.student.fullName +
                    " was already created by " +
                    linkStudentRequest.requestedByParent.fullName);
            }
            const parentStudent = await entityManager.findOne(ParentStudent_1.ParentStudent, {
                where: {
                    parent: {
                        parentId: dto.requestedByParentId,
                        active: true,
                    },
                    student: {
                        studentId: dto.studentId,
                    },
                },
                relations: {
                    parent: true,
                    student: true,
                },
            });
            if (parentStudent) {
                throw Error("Student " +
                    parentStudent.student.fullName +
                    " was already linked to parent " +
                    parentStudent.parent.fullName);
            }
            linkStudentRequest = new LinkStudentRequest_1.LinkStudentRequest();
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            linkStudentRequest.dateRequested = timestamp;
            const requestedByParent = await entityManager.findOne(Parents_1.Parents, {
                where: {
                    parentId: dto.requestedByParentId,
                    active: true,
                },
            });
            if (!requestedByParent) {
                throw Error(parents_constant_1.PARENTS_ERROR_NOT_FOUND);
            }
            linkStudentRequest.requestedByParent = requestedByParent;
            const school = await entityManager.findOne(Schools_1.Schools, {
                where: {
                    schoolId: dto.schoolId,
                    active: true,
                },
            });
            if (!school) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            linkStudentRequest.school = school;
            const student = await entityManager.findOne(Students_1.Students, {
                where: {
                    studentId: dto.studentId,
                    active: true,
                },
            });
            if (!student) {
                throw Error(schools_constant_1.SCHOOLS_ERROR_NOT_FOUND);
            }
            linkStudentRequest.student = student;
            linkStudentRequest = await entityManager.save(linkStudentRequest);
            linkStudentRequest.linkStudentRequestCode = (0, utils_1.generateIndentityCode)(linkStudentRequest.linkStudentRequestId);
            linkStudentRequest = await entityManager.save(LinkStudentRequest_1.LinkStudentRequest, linkStudentRequest);
            return linkStudentRequest;
        });
    }
    async approve(linkStudentRequestCode, dto) {
        return await this.linkStudentRequestRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c;
            let linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    linkStudentRequestCode,
                },
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: true,
                    updatedByUser: true,
                },
            });
            if (!linkStudentRequest) {
                throw Error(link_student_request_constant_1.LINKSTUDENTREQUEST_ERROR_NOT_FOUND);
            }
            if (linkStudentRequest.status === "APPROVED" ||
                linkStudentRequest.status === "CANCELLED" ||
                linkStudentRequest.status === "REJECTED") {
                throw Error("Not allowed to update status, request was already - " +
                    linkStudentRequest.status.toLowerCase());
            }
            linkStudentRequest.status = "APPROVED";
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            linkStudentRequest.updatedDate = timestamp;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            linkStudentRequest.updatedByUser = updatedByUser;
            let parentStudent = await entityManager.findOne(ParentStudent_1.ParentStudent, {
                where: {
                    parent: {
                        parentId: linkStudentRequest.requestedByParent.parentId,
                    },
                    student: {
                        studentId: linkStudentRequest.student.studentId,
                    },
                },
                relations: {
                    parent: true,
                    student: true,
                },
            });
            if (!parentStudent) {
                parentStudent = new ParentStudent_1.ParentStudent();
                parentStudent.parent = await entityManager.findOne(Parents_1.Parents, {
                    where: {
                        parentId: linkStudentRequest.requestedByParent.parentId,
                    },
                });
                parentStudent.student = linkStudentRequest.student;
                await entityManager.save(ParentStudent_1.ParentStudent, parentStudent);
            }
            linkStudentRequest = await entityManager.save(LinkStudentRequest_1.LinkStudentRequest, linkStudentRequest);
            linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    linkStudentRequestCode: linkStudentRequest.linkStudentRequestCode,
                },
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: {
                        user: true,
                    },
                    updatedByUser: true,
                },
            });
            const notifTitle = notifications_constant_1.NOTIF_TITLE.LINK_REQUEST_APPROVED;
            const notifDesc = "Request to Link Student " +
                ((_a = linkStudentRequest.student) === null || _a === void 0 ? void 0 : _a.fullName) +
                " was approved!";
            const subscriptions = await this.linkStudentRequestRepo.manager.find(UserOneSignalSubscription_1.UserOneSignalSubscription, {
                where: {
                    user: {
                        userId: (_c = (_b = linkStudentRequest === null || linkStudentRequest === void 0 ? void 0 : linkStudentRequest.requestedByParent) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.userId,
                    },
                },
            });
            if (subscriptions.length > 0) {
                const massRequest = [];
                for (const subscription of subscriptions) {
                    massRequest.push(await this.oneSignalNotificationService.sendToSubscriber([subscription.subscriptionId], notifications_constant_1.NOTIF_TYPE.LINK_REQUEST.toString(), linkStudentRequest.linkStudentRequestCode, notifTitle, notifDesc));
                }
                await Promise.all(massRequest);
            }
            delete linkStudentRequest.requestedByParent.user.password;
            delete linkStudentRequest.updatedByUser.password;
            await this.logNotification(linkStudentRequest.requestedByParent.user, linkStudentRequest.linkStudentRequestCode, entityManager, notifTitle, notifDesc);
            return linkStudentRequest;
        });
    }
    async reject(linkStudentRequestCode, dto) {
        return await this.linkStudentRequestRepo.manager.transaction(async (entityManager) => {
            var _a, _b, _c;
            let linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    linkStudentRequestCode,
                },
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: true,
                    updatedByUser: true,
                },
            });
            if (!linkStudentRequest) {
                throw Error(link_student_request_constant_1.LINKSTUDENTREQUEST_ERROR_NOT_FOUND);
            }
            if (linkStudentRequest.status === "APPROVED" ||
                linkStudentRequest.status === "CANCELLED" ||
                linkStudentRequest.status === "REJECTED") {
                throw Error("Not allowed to update status, request was already - " +
                    linkStudentRequest.status.toLowerCase());
            }
            linkStudentRequest.status = "REJECTED";
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            linkStudentRequest.updatedDate = timestamp;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            linkStudentRequest.updatedByUser = updatedByUser;
            linkStudentRequest = await entityManager.save(LinkStudentRequest_1.LinkStudentRequest, linkStudentRequest);
            linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    linkStudentRequestCode: linkStudentRequest.linkStudentRequestCode,
                },
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: {
                        user: true,
                    },
                    updatedByUser: true,
                },
            });
            const notifTitle = notifications_constant_1.NOTIF_TITLE.LINK_REQUEST_REJECTED;
            const notifDesc = "Request to Link Student " +
                ((_a = linkStudentRequest.student) === null || _a === void 0 ? void 0 : _a.fullName) +
                " was rejected!";
            const subscriptions = await this.linkStudentRequestRepo.manager.find(UserOneSignalSubscription_1.UserOneSignalSubscription, {
                where: {
                    user: {
                        userId: (_c = (_b = linkStudentRequest === null || linkStudentRequest === void 0 ? void 0 : linkStudentRequest.requestedByParent) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.userId,
                    },
                },
            });
            if (subscriptions.length > 0) {
                const massRequest = [];
                for (const subscription of subscriptions) {
                    massRequest.push(await this.oneSignalNotificationService.sendToSubscriber([subscription.subscriptionId], notifications_constant_1.NOTIF_TYPE.LINK_REQUEST.toString(), linkStudentRequest.linkStudentRequestCode, notifTitle, notifDesc));
                }
                await Promise.all(massRequest);
            }
            delete linkStudentRequest.requestedByParent.user.password;
            delete linkStudentRequest.updatedByUser.password;
            await this.logNotification(linkStudentRequest.requestedByParent.user, linkStudentRequest.linkStudentRequestCode, entityManager, notifTitle, notifDesc);
            return linkStudentRequest;
        });
    }
    async cancel(linkStudentRequestCode, dto) {
        return await this.linkStudentRequestRepo.manager.transaction(async (entityManager) => {
            let linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    linkStudentRequestCode,
                },
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: true,
                    updatedByUser: true,
                },
            });
            if (!linkStudentRequest) {
                throw Error(link_student_request_constant_1.LINKSTUDENTREQUEST_ERROR_NOT_FOUND);
            }
            if (linkStudentRequest.status === "APPROVED" ||
                linkStudentRequest.status === "CANCELLED" ||
                linkStudentRequest.status === "REJECTED") {
                throw Error("Not allowed to update status, request was already - " +
                    linkStudentRequest.status.toLowerCase());
            }
            linkStudentRequest.status = "CANCELLED";
            const timestamp = await entityManager
                .query(timestamp_constant_1.CONST_QUERYCURRENT_TIMESTAMP)
                .then((res) => {
                return res[0]["timestamp"];
            });
            linkStudentRequest.updatedDate = timestamp;
            const updatedByUser = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId: dto.updatedByUserId,
                    active: true,
                },
            });
            if (!updatedByUser) {
                throw Error(user_error_constant_1.USER_ERROR_USER_NOT_FOUND);
            }
            linkStudentRequest.updatedByUser = updatedByUser;
            linkStudentRequest = await entityManager.save(LinkStudentRequest_1.LinkStudentRequest, linkStudentRequest);
            linkStudentRequest = await entityManager.findOne(LinkStudentRequest_1.LinkStudentRequest, {
                where: {
                    linkStudentRequestCode: linkStudentRequest.linkStudentRequestCode,
                },
                relations: {
                    student: true,
                    school: true,
                    requestedByParent: true,
                    updatedByUser: true,
                },
            });
            delete linkStudentRequest.updatedByUser.password;
            return linkStudentRequest;
        });
    }
    async logNotification(user, referenceId, entityManager, title, description) {
        const notifcation = {
            title,
            description,
            type: notifications_constant_1.NOTIF_TYPE.LINK_REQUEST.toString(),
            referenceId,
            isRead: false,
            forUser: user,
        };
        await entityManager.save(Notifications_1.Notifications, notifcation);
        await this.pusherService.sendNotif([user.userId], title, description);
    }
};
LinkStudentRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(LinkStudentRequest_1.LinkStudentRequest)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        pusher_service_1.PusherService,
        firebase_provider_1.FirebaseProvider,
        one_signal_notification_service_1.OneSignalNotificationService])
], LinkStudentRequestService);
exports.LinkStudentRequestService = LinkStudentRequestService;
//# sourceMappingURL=link-student-request.service.js.map