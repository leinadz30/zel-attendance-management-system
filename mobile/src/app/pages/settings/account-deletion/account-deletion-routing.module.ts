import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountDeletionPage } from './account-deletion.page';

const routes: Routes = [
  {
    path: '',
    component: AccountDeletionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountDeletionPageRoutingModule {}
