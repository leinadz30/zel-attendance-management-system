import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonEmployeeUserAccessComponent } from './common-employee-user-access.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { CommonEmployeeUserAccessFormComponent } from './common-employee-user-access-form/common-employee-user-access-form.component';
import { CommonEmployeeUserAccessDetailsComponent } from './common-employee-user-access-details/common-employee-user-access-details.component';
import { AccessPagesTableModule } from 'src/app/shared/access-pages-table/access-pages-table.module';

export const routes: Routes = [
  {
    path: '',
    component: CommonEmployeeUserAccessComponent,
    pathMatch: 'full',
    data: { title: "Employee User Access" }
  },
  {
    path: 'add',
    component: CommonEmployeeUserAccessDetailsComponent,
    data: { title: "Employee User Access", details: true, isNew: true}
  },
  {
    path: ':employeeUserAccessCode',
    component: CommonEmployeeUserAccessDetailsComponent,
    data: { title: "Employee User Access", details: true }
  },
  {
    path: ':employeeUserAccessCode/edit',
    component: CommonEmployeeUserAccessDetailsComponent,
    data: { title: "Employee User Access", details: true, edit: true }
  },
];


@NgModule({
  declarations: [
    CommonEmployeeUserAccessComponent,
    CommonEmployeeUserAccessDetailsComponent,
    CommonEmployeeUserAccessFormComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataTableModule,
    AccessPagesTableModule
  ]
})
export class CommonEmployeeUserAccessModule { }
