import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpsAuthGuard } from './guard/ops-auth.guard';
import { OrgAuthGuard } from './guard/org-auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { OrgComponent } from './pages/organization/organization.component';
import { OpsComponent } from './pages/operations/operations.component';
import { CONST_USER_MODE } from './shared/constant/mode';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'org/dashboard' },
  { path: 'org', pathMatch: 'full', redirectTo: 'org/dashboard' },
  { path: 'auth', pathMatch: 'full', redirectTo: 'auth/org/login' },
  { path: 'auth/org', pathMatch: 'full', redirectTo: 'auth/org/login' },
  { path: 'auth/ops', pathMatch: 'full', redirectTo: 'auth/ops/login' },

  { path: 'ops', pathMatch: 'full', redirectTo: 'ops/dashboard' },

  {
    path: 'profile',
    pathMatch: 'full',
    redirectTo: 'profile/edit-profile',
    title: 'Profile',
  },
  //ops
  {
    path: 'ops',
    component: OpsComponent,
    canActivate: [OpsAuthGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Dashboard' },
        loadChildren: () =>
          import('./pages/common/common-home/common-home.module').then(
            (m) => m.CommonHomeModule
          ),
      },
      {
        path: 'school-management',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Schools' },
        loadChildren: () =>
          import('./pages/common/common-school-management/common-school-management.module').then(
            (m) => m.CommonSchoolManagementModule
          ),
      },
      {
        path: 'departments',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Departments' },
        loadChildren: () =>
          import('./pages/common/common-departments/common-departments.module').then(
            (m) => m.CommonDepartmentsModule
          ),
      },
      {
        path: 'school-year-levels',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'School Year Levels' },
        loadChildren: () =>
          import('./pages/common/common-school-year-levels/common-school-year-levels.module').then(
            (m) => m.CommonSchoolYearLevelsModule
          ),
      },
      {
        path: 'courses',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Courses' },
        loadChildren: () =>
          import('./pages/common/common-courses/common-courses.module').then(
            (m) => m.CommonCoursesModule
          ),
      },
      {
        path: 'strands',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Strands' },
        loadChildren: () =>
          import('./pages/common/common-strands/common-strands.module').then(
            (m) => m.CommonStrandsModule
          ),
      },
      {
        path: 'employee-titles',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Employee Titles' },
        loadChildren: () =>
          import('./pages/common/common-employee-titles/common-employee-titles.module').then(
            (m) => m.CommonEmployeeTitlesModule
          ),
      },
      {
        path: 'sections',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Sections' },
        loadChildren: () =>
          import('./pages/common/common-sections/common-sections.module').then(
            (m) => m.CommonSectionsModule
          ),
      },
      {
        path: 'employees',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Employees' },
        loadChildren: () =>
          import('./pages/common/common-employees/common-employees.module').then(
            (m) => m.CommonEmployeesModule
          ),
      },
      {
        path: 'students',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Students' },
        loadChildren: () =>
          import('./pages/common/common-students/common-students.module').then(
            (m) => m.CommonStudentsModule
          ),
      },
      {
        path: 'link-student-request',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Link Student Request' },
        loadChildren: () =>
          import('./pages/common/common-link-student-request/common-link-student-request.module').then(
            (m) => m.CommonLinkStudentRequestModule
          ),
      },
      {
        path: 'machines',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Machines' },
        loadChildren: () =>
          import('./pages/common/common-machines/common-machines.module').then(
            (m) => m.CommonMachinesModule
          ),
      },
      {
        path: 'parents',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Parents' },
        loadChildren: () =>
          import('./pages/common/common-parents/common-parents.module').then(
            (m) => m.CommonParentsModule
          ),
      },
      {
        path: 'employee-user-access',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Employee User Access' },
        loadChildren: () =>
          import('./pages/common/common-employee-user-access/common-employee-user-access.module').then(
            (m) => m.CommonEmployeeUserAccessModule
          ),
      },
      {
        path: 'employee-user',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Employee User' },
        loadChildren: () =>
          import('./pages/common/common-employee-user/common-employee-user.module').then(
            (m) => m.CommonEmployeeUserModule
          ),
      },
      {
        path: 'users',
        canActivate: [OpsAuthGuard],
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Users' },
        loadChildren: () =>
          import('./pages/operations/ops-users/ops-users.module').then(
            (m) => m.OpsUsersModule
          ),
      },
    ],
  },
  //org
  {
    path: 'org',
    component: OrgComponent,
    canActivate: [OrgAuthGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Dashboard' },
        loadChildren: () =>
          import('./pages/common/common-home/common-home.module').then(
            (m) => m.CommonHomeModule
          ),
      },
      {
        path: 'school-settings',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'School Settings' },
        loadChildren: () =>
          import('./pages/organization/organization-settings/organization-settings.module').then(
            (m) => m.OrganizationSettingsModule
          ),
      },
      {
        path: 'departments',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Departments' },
        loadChildren: () =>
          import('./pages/common/common-departments/common-departments.module').then(
            (m) => m.CommonDepartmentsModule
          ),
      },
      {
        path: 'school-year-levels',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'School Year Levels' },
        loadChildren: () =>
          import('./pages/common/common-school-year-levels/common-school-year-levels.module').then(
            (m) => m.CommonSchoolYearLevelsModule
          ),
      },
      {
        path: 'courses',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Courses' },
        loadChildren: () =>
          import('./pages/common/common-courses/common-courses.module').then(
            (m) => m.CommonCoursesModule
          ),
      },
      {
        path: 'strands',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Strands' },
        loadChildren: () =>
          import('./pages/common/common-strands/common-strands.module').then(
            (m) => m.CommonStrandsModule
          ),
      },
      {
        path: 'employee-titles',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Employee Titles' },
        loadChildren: () =>
          import('./pages/common/common-employee-titles/common-employee-titles.module').then(
            (m) => m.CommonEmployeeTitlesModule
          ),
      },
      {
        path: 'sections',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Sections' },
        loadChildren: () =>
          import('./pages/common/common-sections/common-sections.module').then(
            (m) => m.CommonSectionsModule
          ),
      },
      {
        path: 'employees',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Employees' },
        loadChildren: () =>
          import('./pages/common/common-employees/common-employees.module').then(
            (m) => m.CommonEmployeesModule
          ),
      },
      {
        path: 'students',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Students' },
        loadChildren: () =>
          import('./pages/common/common-students/common-students.module').then(
            (m) => m.CommonStudentsModule
          ),
      },
      {
        path: 'link-student-request',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Link Student Request' },
        loadChildren: () =>
          import('./pages/common/common-link-student-request/common-link-student-request.module').then(
            (m) => m.CommonLinkStudentRequestModule
          ),
      },
      {
        path: 'machines',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Machines' },
        loadChildren: () =>
          import('./pages/common/common-machines/common-machines.module').then(
            (m) => m.CommonMachinesModule
          ),
      },
      {
        path: 'parents',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Parents' },
        loadChildren: () =>
          import('./pages/common/common-parents/common-parents.module').then(
            (m) => m.CommonParentsModule
          ),
      },
      {
        path: 'employee-user-access',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Employee User Access' },
        loadChildren: () =>
          import('./pages/common/common-employee-user-access/common-employee-user-access.module').then(
            (m) => m.CommonEmployeeUserAccessModule
          ),
      },
      {
        path: 'employee-user',
        canActivate: [OrgAuthGuard],
        data: { mode: CONST_USER_MODE.ORGANIZATION, title: 'Employee User' },
        loadChildren: () =>
          import('./pages/common/common-employee-user/common-employee-user.module').then(
            (m) => m.CommonEmployeeUserModule
          ),
      }
    ],
  },
  //profile
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: 'edit-profile',
        loadChildren: () =>
          import('./pages/profile/edit-profile/edit-profile.module').then(
            (m) => m.EditProfileModule
          ),
      },
      {
        path: 'password-and-security',
        loadChildren: () =>
          import(
            './pages/profile/password-and-security/password-and-security.module'
          ).then((m) => m.PasswordAndSecurityModule),
      },
    ],
  },
  //auth ops
  {
    path: 'auth/ops',
    component: AuthComponent,
    data: { mode: CONST_USER_MODE.OPERATION },
    children: [
      {
        path: 'login',
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Login' },
        loadChildren: () =>
          import('./auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        data: { mode: CONST_USER_MODE.OPERATION, title: 'Register' },
        loadChildren: () =>
          import('./auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
    ],
  },
  //auth org
  {
    path: 'auth/org',
    component: AuthComponent,
    data: { ops: false },
    children: [
      {
        path: 'login',
        data: { ops: false, title: 'Login to Organization' },
        loadChildren: () =>
          import('./auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        data: { ops: false, title: 'Register to Organization' },
        loadChildren: () =>
          import('./auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
    ],
  },
  //ops/no-access
  {
    path: 'ops/no-access',
    component: NoAccessComponent,
  },
  //org/no-access
  {
    path: 'org/no-access',
    component: NoAccessComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
