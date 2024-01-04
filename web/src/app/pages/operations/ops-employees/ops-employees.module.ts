import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsEmployeesComponent } from './ops-employees.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsEmployeeFormComponent } from './ops-employees-form/ops-employees-form.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsEmployeesComponent,
    pathMatch: 'full',
    data: { title: "Employees" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode/sylvl',
    component: OpsEmployeesComponent,
    data: { title: "Employees", find: true }
  },
  {
    path: 'find/:schoolCode',
    component: OpsEmployeesComponent,
    data: { title: "Employees", find: true }
  },
  {
    path: 'find/:schoolCode/dept/:departmentCode',
    component: OpsEmployeesComponent,
    data: { title: "Employees", find: true }
  }
]

@NgModule({
  declarations: [
    OpsEmployeesComponent,
    OpsEmployeeFormComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DataTableModule
  ]
})
export class OpsEmployeesModule { }
