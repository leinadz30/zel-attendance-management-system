/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { HomePage } from './pages/home/home.page';
import { NavigationPage } from './navigation/navigation.page';

const routes: Routes = [
  {
    path: '',
    component: NavigationPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'my-students',
        loadChildren: () => import('./pages/my-students/my-students.module').then( m => m.MyStudentsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
    data: {
      auth: true
    }
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule),
    data: {
      auth: true
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./pages/landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'search-students-by-school',
    loadChildren: () => import('./component/search-students-by-school/search-students-by-school.module').then( m => m.SearchStudentsBySchoolPageModule)
  },
  {
    path: 'search-school',
    loadChildren: () => import('./component/search-school/search-school.module').then( m => m.SearchSchoolPageModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./pages/timeline/timeline.module').then( m => m.TimelinePageModule)
  },  {
    path: 'my-link-student-requests',
    loadChildren: () => import('./pages/my-link-student-requests/my-link-student-requests.module').then( m => m.MyLinkStudentRequestsPageModule)
  },
  {
    path: 'student-time-info',
    loadChildren: () => import('./component/student-time-info/student-time-info.module').then( m => m.StudentTimeInfoPageModule)
  },
  {
    path: 'request-info',
    loadChildren: () => import('./component/request-info/request-info.module').then( m => m.RequestInfoPageModule)
  },



];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
