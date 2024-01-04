import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsStudentsComponent } from './ops-students.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsStudentFormComponent } from './ops-students-form/ops-students-form.component';
import { OpsStudentParentsDialogComponent } from './ops-students-parents-dialog/ops-students-parents-dialog.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsStudentsComponent,
    pathMatch: 'full',
    data: { title: "Students" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode/sylvl',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/course',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/course/:courseCode',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/strand',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/strand/:strandCode',
    component: OpsStudentsComponent,
    data: { title: "Students", find: true }
  }
]

@NgModule({
  declarations: [
    OpsStudentsComponent,
    OpsStudentFormComponent,
    OpsStudentParentsDialogComponent
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
export class OpsStudentsModule { }
