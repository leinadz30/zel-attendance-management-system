import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonCoursesComponent } from './common-courses.component';
import { CommonCourseFormComponent } from './common-courses-form/common-courses-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonCoursesComponent,
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
    component: CommonCoursesComponent,
    data: { title: "Courses", find: true }
  }
]

@NgModule({
  declarations: [
    CommonCoursesComponent,
    CommonCourseFormComponent,
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
export class CommonCoursesModule { }
