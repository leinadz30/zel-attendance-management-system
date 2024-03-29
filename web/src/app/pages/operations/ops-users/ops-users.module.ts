import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsUsersComponent } from './ops-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OpsUserFormComponent } from './ops-user-form/ops-user-form.component';
import { OpsChangePasswordComponent } from './ops-change-password/ops-change-password.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsUsersComponent,
    pathMatch: 'full',
    data: { title: "Operator Users" }
  }
];

@NgModule({
  declarations: [
    OpsUsersComponent,
    OpsChangePasswordComponent,
    OpsUserFormComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ]
})
export class OpsUsersModule { }
