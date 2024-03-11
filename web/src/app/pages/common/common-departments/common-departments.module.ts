import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDepartmentsComponent } from './common-departments.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonDepartmentFormComponent } from './common-departments-form/common-departments-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonDepartmentsComponent,
    pathMatch: 'full',
    data: { title: "Departments" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode/type',
    component: CommonDepartmentsComponent,
    data: { title: "Departments", find: true }
  },
  {
    path: 'find/:schoolCode',
    component: CommonDepartmentsComponent,
    data: { title: "Departments", find: true }
  },
  {
    path: 'find/:schoolCode/type/:type',
    component: CommonDepartmentsComponent,
    data: { title: "Departments", find: true }
  },
]

@NgModule({
  declarations: [
    CommonDepartmentsComponent,
    CommonDepartmentFormComponent,
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
export class CommonDepartmentsModule { }
