import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentTimeInfoPage } from './student-time-info.page';

const routes: Routes = [
  {
    path: '',
    component: StudentTimeInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentTimeInfoPageRoutingModule {}
