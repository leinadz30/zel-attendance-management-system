import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchStudentsBySchoolPageRoutingModule } from './search-students-by-school-routing.module';

import { SearchStudentsBySchoolPage } from './search-students-by-school.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SearchStudentsBySchoolPageRoutingModule
  ],
  declarations: [SearchStudentsBySchoolPage]
})
export class SearchStudentsBySchoolPageModule {}
