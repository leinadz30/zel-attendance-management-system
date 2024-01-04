import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkStudentRequestPage } from './link-student-request.page';

const routes: Routes = [
  {
    path: '',
    component: LinkStudentRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkStudentRequestPageRoutingModule {}
