import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpsHomeComponent } from './ops-home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

export const routes: Routes = [
  {
    path: '',
    component: OpsHomeComponent,
    pathMatch: 'full',
    data: { title: "Dashboard" }
  }
];

@NgModule({
  declarations: [OpsHomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class OpsHomeModule { }
