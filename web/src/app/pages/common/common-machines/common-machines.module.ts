import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMachinesComponent } from './common-machines.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonMachineFormComponent } from './common-machines-form/common-machines-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonMachinesComponent,
    pathMatch: 'full',
    data: { title: "Machines" }
  },
  {
    path: 'find',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: 'find/:schoolCode',
    component: CommonMachinesComponent,
    data: { title: "Machines", find: true }
  }
]

@NgModule({
  declarations: [
    CommonMachinesComponent,
    CommonMachineFormComponent,
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
export class CommonMachinesModule { }
