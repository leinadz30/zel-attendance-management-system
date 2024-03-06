import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSchoolYearLevelsComponent } from './common-school-year-levels.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonSchoolYearLevelFormComponent } from './common-school-year-form/common-school-year-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonSchoolYearLevelsComponent,
    pathMatch: 'full',
    data: { title: "School Year Levels" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: CommonSchoolYearLevelsComponent,
    data: { title: "School Year Levels", find: true }
  }
]

@NgModule({
  declarations: [
    CommonSchoolYearLevelsComponent,
    CommonSchoolYearLevelFormComponent
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
export class CommonSchoolYearLevelsModule { }
