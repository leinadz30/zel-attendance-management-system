import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonSectionsComponent } from './common-sections.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DataTableModule } from 'src/app/shared/data-table/data-table.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CommonSectionFormComponent } from './common-sections-form/common-sections-form.component';


export const routes: Routes = [
  {
    path: '',
    component: CommonSectionsComponent,
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
    component: CommonSectionsComponent,
  },
  {
    path: 'find/:schoolCode',
    component: CommonSectionsComponent,
    data: { title: "Sections", find: true }
  },
  {
    path: 'find/:schoolCode/sylvl/:schoolYearLevelCode',
    component: CommonSectionsComponent,
    data: { title: "Sections", find: true }
  }
]

@NgModule({
  declarations: [
    CommonSectionsComponent,
    CommonSectionFormComponent
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
export class CommonSectionsModule { }
