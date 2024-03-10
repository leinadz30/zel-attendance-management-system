import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSchoolManagementComponent } from './common-school-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { CommonSchoolManagementDetailsComponent } from './common-school-management-details/common-school-management-details.component';

export const routes: Routes = [
  {
    path: '',
    component: CommonSchoolManagementComponent,
    pathMatch: 'full',
    data: { title: "Schools" }
  },
  {
    path: 'add',
    component: CommonSchoolManagementDetailsComponent,
    data: { title: "New School", details: true, isNew: true}
  },
  {
    path: ':schoolCode',
    component: CommonSchoolManagementDetailsComponent,
    data: { title: "Schools", details: true }
  },
  {
    path: ':schoolCode/edit',
    component: CommonSchoolManagementDetailsComponent,
    data: { title: "Schools", details: true, edit: true }
  },
];


@NgModule({
  declarations: [
    CommonSchoolManagementComponent,
    CommonSchoolManagementDetailsComponent
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
export class CommonSchoolManagementModule { }
