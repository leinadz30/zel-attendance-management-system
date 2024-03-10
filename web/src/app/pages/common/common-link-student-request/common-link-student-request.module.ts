import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonLinkStudentRequestComponent } from './common-link-student-request.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonLinkStudentRequestDetailsComponent } from './common-link-student-request-details/common-link-student-request-details.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonLinkStudentRequestComponent,
    pathMatch: 'full',
    data: { title: "Link Student Request" }
  }
]


@NgModule({
  declarations: [
    CommonLinkStudentRequestComponent,
    CommonLinkStudentRequestDetailsComponent
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
export class CommonLinkStudentRequestModule { }
