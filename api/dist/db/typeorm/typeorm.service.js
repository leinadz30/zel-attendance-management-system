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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const Announcements_1 = require("./../entities/Announcements");
const StudentStrand_1 = require("./../entities/StudentStrand");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const Courses_1 = require("../entities/Courses");
const Departments_1 = require("../entities/Departments");
const Employees_1 = require("../entities/Employees");
const EmployeeTitles_1 = require("../entities/EmployeeTitles");
const Machines_1 = require("../entities/Machines");
const Notifications_1 = require("../entities/Notifications");
const Operators_1 = require("../entities/Operators");
const Parents_1 = require("../entities/Parents");
const ParentStudent_1 = require("../entities/ParentStudent");
const Schools_1 = require("../entities/Schools");
const SchoolYearLevels_1 = require("../entities/SchoolYearLevels");
const Sections_1 = require("../entities/Sections");
const StudentCourse_1 = require("../entities/StudentCourse");
const Students_1 = require("../entities/Students");
const TapLogs_1 = require("../entities/TapLogs");
const UserFirebaseToken_1 = require("../entities/UserFirebaseToken");
const Users_1 = require("../entities/Users");
const StudentSection_1 = require("../entities/StudentSection");
const SchoolRequestAccess_1 = require("../entities/SchoolRequestAccess");
const EmployeeUser_1 = require("../entities/EmployeeUser");
const LinkStudentRequest_1 = require("../entities/LinkStudentRequest");
const Strands_1 = require("../entities/Strands");
const UserProfilePic_1 = require("../entities/UserProfilePic");
const Files_1 = require("../entities/Files");
const UserOneSignalSubscription_1 = require("../entities/UserOneSignalSubscription");
const EmployeeUserAccess_1 = require("../entities/EmployeeUserAccess");
let TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        const ssl = this.config.get("SSL");
        const config = {
            type: "postgres",
            host: this.config.get("DATABASE_HOST"),
            port: Number(this.config.get("DATABASE_PORT")),
            database: this.config.get("DATABASE_NAME"),
            username: this.config.get("DATABASE_USER"),
            password: this.config.get("DATABASE_PASSWORD"),
            entities: [
                Courses_1.Courses,
                Departments_1.Departments,
                EmployeeUserAccess_1.EmployeeUserAccess,
                Employees_1.Employees,
                EmployeeTitles_1.EmployeeTitles,
                Machines_1.Machines,
                Notifications_1.Notifications,
                Operators_1.Operators,
                Parents_1.Parents,
                ParentStudent_1.ParentStudent,
                Schools_1.Schools,
                SchoolYearLevels_1.SchoolYearLevels,
                Sections_1.Sections,
                StudentCourse_1.StudentCourse,
                Students_1.Students,
                TapLogs_1.TapLogs,
                UserFirebaseToken_1.UserFirebaseToken,
                Users_1.Users,
                StudentSection_1.StudentSection,
                SchoolRequestAccess_1.SchoolRequestAccess,
                LinkStudentRequest_1.LinkStudentRequest,
                EmployeeUser_1.EmployeeUser,
                Strands_1.Strands,
                StudentStrand_1.StudentStrand,
                Files_1.Files,
                UserProfilePic_1.UserProfilePic,
                UserOneSignalSubscription_1.UserOneSignalSubscription,
                Announcements_1.Announcements,
            ],
            synchronize: false,
            ssl: ssl.toLocaleLowerCase().includes("true"),
            extra: {},
        };
        if (config.ssl) {
            config.extra.ssl = {
                require: true,
                rejectUnauthorized: false,
            };
        }
        return config;
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], TypeOrmConfigService.prototype, "config", void 0);
TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
exports.TypeOrmConfigService = TypeOrmConfigService;
//# sourceMappingURL=typeorm.service.js.map