import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonEmployeeTitleFormComponent } from './common-employee-titles-form/common-employee-titles-form.component';
import { CommonEmployeeTitleComponent } from './common-employee-titles.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonEmployeeTitleComponent,
    pathMatch: 'full',
    data: { title: "Employee Titles" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: CommonEmployeeTitleComponent,
    data: { title: "Employee Titles", find: true }
  }
]

@NgModule({
  declarations: [
    CommonEmployeeTitleComponent,
    CommonEmployeeTitleFormComponent,
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
export class CommonEmployeeTitlesModule { }
