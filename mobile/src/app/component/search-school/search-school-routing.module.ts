import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSchoolPage } from './search-school.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSchoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSchoolPageRoutingModule {}
