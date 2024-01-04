import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsSectionsComponent } from './ops-sections.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsSectionFormComponent } from './ops-sections-form/ops-sections-form.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsSectionsComponent,
    pathMatch: 'full',
    data: { title: "Sections" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode/sylvl',
    component: OpsSectionsComponent,
  },
  {
    path: 'find/:schoolCode',
    component: OpsSectionsComponent,
    data: { title: "Sections", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode',
    component: OpsSectionsComponent,
    data: { title: "Sections", find: true }
  }
]

@NgModule({
  declarations: [
    OpsSectionsComponent,
    OpsSectionFormComponent
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
export class OpsSectionsModule { }
