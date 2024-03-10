import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonEmployeeUserComponent } from './common-employee-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonEmployeeUserDetailsComponent } from './common-employee-user-details/common-employee-user-details.component';
import { AccessPagesTableModule } from 'src/app/shared/access-pages-table/access-pages-table.module';
import { ComminEmployeeUserChangePasswordComponent } from './common-employee-user-change-password/common-employee-user-change-password.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonEmployeeUserComponent,
    pathMatch: 'full',
    data: { title: "Employee User" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: CommonEmployeeUserComponent,
    data: { title: "Employee User", find: true }
  },
  {
    path: 'find/:schoolCode/role/:employeeUserRoleCode',
    component: CommonEmployeeUserComponent,
    data: { title: "Employee User", find: true }
  },
  {
    path: 'add/:schoolCode',
    component: CommonEmployeeUserDetailsComponent,
    data: { title: "Employee User", details: true, isNew: true}
  },
  {
    path: 'add',
    component: CommonEmployeeUserDetailsComponent,
    data: { title: "Employee User", details: true, isNew: true}
  },
  {
    path: ':employeeCode',
    component: CommonEmployeeUserDetailsComponent,
    data: { title: "Employee User", details: true }
  },
  {
    path: ':employeeCode/edit',
    component: CommonEmployeeUserDetailsComponent,
    data: { title: "Employee User", details: true, edit: true }
  },
]

@NgModule({
  declarations: [
    CommonEmployeeUserComponent,
    CommonEmployeeUserDetailsComponent,
    ComminEmployeeUserChangePasswordComponent,
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
export class CommonEmployeeUserModule { }
