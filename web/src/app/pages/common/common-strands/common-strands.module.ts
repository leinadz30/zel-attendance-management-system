import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonStrandsComponent } from './common-strands.component';
import { CommonStrandFormComponent } from './common-strands-form/common-strands-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonStrandsComponent,
    pathMatch: 'full',
    data: { title: "Strands" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: CommonStrandsComponent,
    data: { title: "Strands", find: true }
  }
]

@NgModule({
  declarations: [
    CommonStrandsComponent,
    CommonStrandFormComponent,
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
export class CommonStrandsModule { }
