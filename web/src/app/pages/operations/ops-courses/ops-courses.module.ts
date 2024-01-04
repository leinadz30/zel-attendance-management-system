import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsCoursesComponent } from './ops-courses.component';
import { OpsCourseFormComponent } from './ops-courses-form/ops-courses-form.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsCoursesComponent,
    pathMatch: 'full',
    data: { title: "Courses" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: OpsCoursesComponent,
    data: { title: "Courses", find: true }
  }
]

@NgModule({
  declarations: [
    OpsCoursesComponent,
    OpsCourseFormComponent,
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
export class OpsCoursesModule { }
