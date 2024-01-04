import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSchoolPageRoutingModule } from './search-school-routing.module';

import { SearchSchoolPage } from './search-school.page';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SearchSchoolPageRoutingModule
  ],
  declarations: [SearchSchoolPage]
})
export class SearchSchoolPageModule {}
