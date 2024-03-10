import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestInfoPage } from './request-info.page';

const routes: Routes = [
  {
    path: '',
    component: RequestInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestInfoPageRoutingModule {}
