import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsDepartmentsComponent } from './ops-departments.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsDepartmentFormComponent } from './ops-departments-form/ops-departments-form.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsDepartmentsComponent,
    pathMatch: 'full',
    data: { title: "Departments" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: OpsDepartmentsComponent,
    data: { title: "Departments", find: true }
  }
]

@NgModule({
  declarations: [
    OpsDepartmentsComponent,
    OpsDepartmentFormComponent,
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
export class OpsDepartmentsModule { }
