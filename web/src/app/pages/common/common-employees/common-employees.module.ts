import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonEmployeesComponent } from './common-employees.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonEmployeeFormComponent } from './common-employees-form/common-employees-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonEmployeesComponent,
    pathMatch: 'full',
    data: { title: "Employees" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: CommonEmployeesComponent,
    data: { title: "Employees", find: true }
  },
  {
    path: 'find/:schoolCode/dept/:departmentCode',
    component: CommonEmployeesComponent,
    data: { title: "Employees", find: true }
  }
]

@NgModule({
  declarations: [
    CommonEmployeesComponent,
    CommonEmployeeFormComponent
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
export class CommonEmployeesModule { }
