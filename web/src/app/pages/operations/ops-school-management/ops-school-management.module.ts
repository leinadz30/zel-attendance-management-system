import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsSchoolManagementComponent } from './ops-school-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { OpsSchoolManagementDetailsComponent } from './ops-school-management-details/ops-school-management-details.component';

export const routes: Routes = [
  {
    path: '',
    component: OpsSchoolManagementComponent,
    pathMatch: 'full',
    data: { title: "Schools" }
  },
  {
    path: 'add',
    component: OpsSchoolManagementDetailsComponent,
    data: { title: "New School", details: true, isNew: true}
  },
  {
    path: ':schoolCode',
    component: OpsSchoolManagementDetailsComponent,
    data: { title: "Schools", details: true }
  },
  {
    path: ':schoolCode/edit',
    component: OpsSchoolManagementDetailsComponent,
    data: { title: "Schools", details: true, edit: true }
  },
];


@NgModule({
  declarations: [
    OpsSchoolManagementComponent,
    OpsSchoolManagementDetailsComponent
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
export class OpsSchoolManagementModule { }
