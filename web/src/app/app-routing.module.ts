import { OpsHomeModule } from './pages/operations/ops-home/ops-home.module';
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

  {
    path: 'ops',
    component: OpsComponent,
    canActivate: [OpsAuthGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Dashboard' },
        loadChildren: () =>
          import('./pages/operations/ops-home/ops-home.module').then(
            (m) => m.OpsHomeModule
          ),
      },
      {
        path: 'school-management',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Schools' },
        loadChildren: () =>
          import('./pages/operations/ops-school-management/ops-school-management.module').then(
            (m) => m.OpsSchoolManagementModule
          ),
      },
      {
        path: 'departments',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Departments' },
        loadChildren: () =>
          import('./pages/operations/ops-departments/ops-departments.module').then(
            (m) => m.OpsDepartmentsModule
          ),
      },
      {
        path: 'school-year-levels',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'School Year Levels' },
        loadChildren: () =>
          import('./pages/operations/ops-school-year-levels/ops-school-year-levels.module').then(
            (m) => m.OpsSchoolYearLevelsModule
          ),
      },
      {
        path: 'courses',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Courses' },
        loadChildren: () =>
          import('./pages/operations/ops-courses/ops-courses.module').then(
            (m) => m.OpsCoursesModule
          ),
      },
      {
        path: 'strands',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Strands' },
        loadChildren: () =>
          import('./pages/operations/ops-strands/ops-strands.module').then(
            (m) => m.OpsStrandsModule
          ),
      },
      {
        path: 'employee-titles',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Employee Titles' },
        loadChildren: () =>
          import('./pages/operations/ops-employee-titles/ops-employee-titles.module').then(
            (m) => m.OpsEmployeeTitlesModule
          ),
      },
      {
        path: 'sections',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Sections' },
        loadChildren: () =>
          import('./pages/operations/ops-sections/ops-sections.module').then(
            (m) => m.OpsSectionsModule
          ),
      },
      {
        path: 'employees',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Employees' },
        loadChildren: () =>
          import('./pages/operations/ops-employees/ops-employees.module').then(
            (m) => m.OpsEmployeesModule
          ),
      },
      {
        path: 'students',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Students' },
        loadChildren: () =>
          import('./pages/operations/ops-students/ops-students.module').then(
            (m) => m.OpsStudentsModule
          ),
      },
      {
        path: 'link-student-request',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Link Student Request' },
        loadChildren: () =>
          import('./pages/operations/ops-link-student-request/ops-link-student-request.module').then(
            (m) => m.OpsLinkStudentRequestModule
          ),
      },
      {
        path: 'machines',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Link Student Request' },
        loadChildren: () =>
          import('./pages/operations/ops-machines/ops-machines.module').then(
            (m) => m.OpsMachinesModule
          ),
      },
      {
        path: 'parents',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Parents' },
        loadChildren: () =>
          import('./pages/parents/parents.module').then(
            (m) => m.ParentsModule
          ),
      },
      {
        path: 'users',
        canActivate: [OpsAuthGuard],
        data: { ops: true, title: 'Users' },
        loadChildren: () =>
          import('./pages/operations/ops-users/ops-users.module').then(
            (m) => m.OpsUsersModule
          ),
      },
    ],
  },
  {
    path: 'org',
    component: OrgComponent,
    canActivate: [OrgAuthGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [OrgAuthGuard],
        loadChildren: () =>
          import('./pages/organization/org-home/org-home.module').then(
            (m) => m.OrgHomeModule
          ),
      },
    ],
  },
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
  {
    path: 'auth/ops',
    component: AuthComponent,
    data: { ops: true },
    children: [
      {
        path: 'login',
        data: { ops: true, title: 'Login' },
        loadChildren: () =>
          import('./auth/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'register',
        data: { ops: true, title: 'Register' },
        loadChildren: () =>
          import('./auth/register/register.module').then(
            (m) => m.RegisterModule
          ),
      },
    ],
  },
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
  {
    path: 'ops/no-access',
    component: NoAccessComponent,
  },
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
