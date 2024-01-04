import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLinkStudentRequestsPage } from './my-link-student-requests.page';

const routes: Routes = [
  {
    path: '',
    component: MyLinkStudentRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLinkStudentRequestsPageRoutingModule {}
