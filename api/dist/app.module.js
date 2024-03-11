"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_service_1 = require("./db/typeorm/typeorm.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./controller/auth/auth.module");
const Joi = __importStar(require("@hapi/joi"));
const utils_1 = require("./common/utils/utils");
const schools_module_1 = require("./controller/schools/schools.module");
const departments_module_1 = require("./controller/departments/departments.module");
const courses_module_1 = require("./controller/courses/courses.module");
const school_year_levels_module_1 = require("./controller/school-year-levels/school-year-levels.module");
const sections_module_1 = require("./controller/sections/sections.module");
const employee_titles_module_1 = require("./controller/employee-titles/employee-titles.module");
const students_module_1 = require("./controller/students/students.module");
const employees_module_1 = require("./controller/employees/employees.module");
const operators_module_1 = require("./controller/operators/operators.module");
const parents_module_1 = require("./controller/parents/parents.module");
const link_student_request_module_1 = require("./controller/link-student-request/link-student-request.module");
const user_firebase_token_module_1 = require("./controller/user-firebase-token/user-firebase-token.module");
const tap_logs_module_1 = require("./controller/tap-logs/tap-logs.module");
const machines_module_1 = require("./controller/machines/machines.module");
const strands_module_1 = require("./controller/strands/strands.module");
const notifications_module_1 = require("./controller/notifications/notifications.module");
const user_one_signal_subscription_module_1 = require("./controller/user-one-signal-subscription/user-one-signal-subscription.module");
const announcements_module_1 = require("./controller/announcements/announcements.module");
const employee_user_module_1 = require("./controller/employee-user/employee-user.module");
const employee_user_access_module_1 = require("./controller/employee-user-access/employee-user-access.module");
const app_release_module_1 = require("./controller/app-release/app-release.module");
const envFilePath = (0, utils_1.getEnvPath)(`${__dirname}/common/envs`);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath,
                isGlobal: true,
                validationSchema: Joi.object({
                    UPLOADED_FILES_DESTINATION: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigService }),
            auth_module_1.AuthModule,
            schools_module_1.SchoolsModule,
            employee_user_access_module_1.EmployeeUserAccessModule,
            employee_titles_module_1.EmployeeTitlesModule,
            departments_module_1.DepartmentsModule,
            courses_module_1.CoursesModule,
            school_year_levels_module_1.SchoolYearLevelsModule,
            sections_module_1.SectionsModule,
            operators_module_1.OperatorsModule,
            employees_module_1.EmployeesModule,
            employee_user_module_1.EmployeeUserModule,
            students_module_1.StudentsModule,
            parents_module_1.ParentsModule,
            link_student_request_module_1.LinkStudentRequestModule,
            user_firebase_token_module_1.UserFirebaseTokenModule,
            machines_module_1.MachinesModule,
            tap_logs_module_1.TapLogsModule,
            strands_module_1.StrandsModule,
            notifications_module_1.NotificationsModule,
            user_one_signal_subscription_module_1.UserOneSignalSubscriptionModule,
            announcements_module_1.AnnouncementsModule,
            app_release_module_1.AppReleaseModule,
        ],
        providers: [app_service_1.AppService],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map