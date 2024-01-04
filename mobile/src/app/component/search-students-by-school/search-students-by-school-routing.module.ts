import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchStudentsBySchoolPage } from './search-students-by-school.page';

const routes: Routes = [
  {
    path: '',
    component: SearchStudentsBySchoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchStudentsBySchoolPageRoutingModule {}
