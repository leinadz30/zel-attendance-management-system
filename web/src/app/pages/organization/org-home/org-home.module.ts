import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgHomeComponent } from './org-home.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: OrgHomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [OrgHomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class OrgHomeModule { }
