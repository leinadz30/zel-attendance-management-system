import { TimelinePageModule } from './../timeline/timeline.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyStudentsPage } from './my-students.page';

const routes: Routes = [
  {
    path: '',
    component: MyStudentsPage,
  },
  {
    path: 'link-student-request',
    loadChildren: () => import('./link-student-request/link-student-request.module').then( m => m.LinkStudentRequestPageModule)
  },
  {
    path: 'student-details',
    loadChildren: () => import('./student-details/student-details.module').then( m => m.StudentDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStudentsPageRoutingModule {}
