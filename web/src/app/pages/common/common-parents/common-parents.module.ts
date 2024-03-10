import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonParentDetailsComponent } from './common-parent-details/common-parent-details.component';
import { CommonParentsComponent } from './common-parents.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonParentsComponent,
    pathMatch: 'full',
    data: { title: "Parents" }
  },
]

@NgModule({
  declarations: [
    CommonParentsComponent,
    CommonParentDetailsComponent
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
export class CommonParentsModule { }
