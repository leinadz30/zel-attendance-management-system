import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonStudentsComponent } from './common-students.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonStudentFormComponent } from './common-students-form/common-students-form.component';
import { CommonStudentParentsDialogComponent } from './common-students-parents-dialog/common-students-parents-dialog.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonStudentsComponent,
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
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode',
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode',
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/course',
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/course/:courseCode',
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/strand',
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode/strand/:strandCode',
    component: CommonStudentsComponent,
    data: { title: "Students", find: true }
  }
]

@NgModule({
  declarations: [
    CommonStudentsComponent,
    CommonStudentFormComponent,
    CommonStudentParentsDialogComponent
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
export class CommonStudentsModule { }
