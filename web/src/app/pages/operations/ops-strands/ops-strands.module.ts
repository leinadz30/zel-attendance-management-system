import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OpsStrandsComponent } from './ops-strands.component';
import { OpsStrandFormComponent } from './ops-strands-form/ops-strands-form.component';


export const routes: Routes = [
  {
    path: '',
    component: OpsStrandsComponent,
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
    component: OpsStrandsComponent,
    data: { title: "Strands", find: true }
  }
]

@NgModule({
  declarations: [
    OpsStrandsComponent,
    OpsStrandFormComponent,
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
export class OpsStrandsModule { }
