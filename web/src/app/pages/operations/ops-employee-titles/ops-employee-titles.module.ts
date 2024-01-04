import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsEmployeeTitleFormComponent } from './ops-employee-titles-form/ops-employee-titles-form.component';
import { OpsEmployeeTitleComponent } from './ops-employee-titles.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsEmployeeTitleComponent,
    pathMatch: 'full',
    data: { title: "Employee Title" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: OpsEmployeeTitleComponent,
    data: { title: "Employee Title", find: true }
  }
]

@NgModule({
  declarations: [
    OpsEmployeeTitleComponent,
    OpsEmployeeTitleFormComponent,
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
export class OpsEmployeeTitlesModule { }
